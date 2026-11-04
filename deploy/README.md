# Deploying the indexer

This directory runs the indexer from a prebuilt image. It holds no source and
builds nothing — `docker compose build` is never needed here, and the host does
not need a checkout of the repo.

Images are built by `.github/workflows/build-image.yml` and published to
`ghcr.io/teia-community/indexer`.

## Layout on the host

Copy `docker-compose.yml`, `.env.sample` and (if you need ingress)
`docker-compose.ingress.example.yml` to the deploy directory
(e.g. `/opt/teztok`), then:

```
/opt/teztok/
  docker-compose.yml
  docker-compose.ingress.yml   # optional, your own; gitignored
  .env                         # from .env.sample, never committed
  db/                          # postgres data
  data/                        # app data (logs, teztok.json)
```

The external `ipfs` network must already exist on the host.

## Ingress

The base compose publishes no ports: the api is reachable only on the compose
network. Deployment-specific routing lives in an overlay, so that hostnames,
certificate resolvers and named middlewares stay out of this repo.

```sh
cp docker-compose.ingress.example.yml docker-compose.ingress.yml
$EDITOR docker-compose.ingress.yml
```

Then pass both files on **every** command, including `pull`, `stop`, `logs` and
the profile runs below:

```sh
docker compose -f docker-compose.yml -f docker-compose.ingress.yml up -d
```

Compose merges the files in order, so omitting the overlay silently drops the
ingress on the next `up -d`. Setting `COMPOSE_FILE` in `.env` avoids repeating
the flags:

```
COMPOSE_FILE=docker-compose.yml:docker-compose.ingress.yml
```

The examples below omit the flags for brevity; add them, or set `COMPOSE_FILE`.

## First run

Pick one of the two paths. Bring up only the database first — a restore drops
existing objects, and the workers must not be running during either step.

```sh
docker compose up -d teztok_database
```

**From scratch** (empty database, schema created by the migrations):

```sh
docker compose --profile init run --rm db_init
```

**From the newest S3 backup:**

```sh
docker compose --profile restore run --rm db_restore
docker compose --profile init run --rm db_init     # bring schema up to date
```

To restore a specific backup, pass its timestamp as it appears in the object
name (`teztok_<timestamp>.dump`):

```sh
docker compose --profile restore run --rm db_restore 2026-11-04T00:08:30
```

Always run `db_init` after a restore. A backup can predate a schema change; the
migrations are tracked in `knex_migrations` and are idempotent, so running them
on an already-current database does nothing.

Then start everything:

```sh
docker compose up -d
```

## Deploying a new version

`INDEXER_TAG` in `.env` is the only thing that changes. Use an immutable tag —
`v1.2.3` from a release, or `sha-abc1234` from any build. `latest` is not
published on purpose: it cannot be rolled back to, and it hides which revision
is running.

```sh
# edit INDEXER_TAG in .env
docker compose pull
docker compose up -d
```

If the release contains a new migration, apply it before the workers see the new
schema:

```sh
# edit INDEXER_TAG in .env
docker compose pull
docker compose stop teztok_ctrl teztok_event-producer teztok_fetch-metadata \
  teztok_rebuild-token teztok_warmup_thumbnailcache
docker compose --profile init run --rm db_init
docker compose up -d
```

## Rolling back

Set `INDEXER_TAG` back to the previous tag, then `pull` and `up -d`. Worth
doing once deliberately, while nothing is broken, so the path is known to work
before it is needed.

A rollback only reverts code. It does not undo a migration, so a release that
changes the schema is not automatically reversible — check that the older image
still runs against the current schema before relying on it.

## Operating notes

- `docker compose logs -f --tail=100 teztok_ctrl` to follow the controller.
- The `backup` service runs `@daily` and keeps 7 days. It starts with
  `up -d` and needs no manual step.
- On restart the controller resumes from `MAX(events.level)`, so it re-indexes
  the trailing run of blocks that contained no events. That is expected and
  self-correcting.
- `S3_PREFIX` must be set in `.env`. `restore.sh` reads it under `set -u` while
  the image only defaults `S3_PATH`, so omitting it fails with an unbound
  variable error rather than a clear message.
- `PASSPHRASE` must stay empty to read existing unencrypted `.dump` files.
  Setting it changes the expected object name to `.dump.gpg` and makes older
  backups unrestorable.
