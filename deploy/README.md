# Deploying the indexer

This directory runs the indexer from a prebuilt image. It holds no source and
builds nothing — `docker compose build` is never needed here, and the host does
not need a checkout of the repo.

Images are built by `.github/workflows/build-image.yml` and published to
`ghcr.io/teia-community/indexer`.

## Layout on the host

Copy `docker-compose.yml`, `.env.sample` and (if you need a site overlay)
`docker-compose.site.example.yml` to the deploy directory
(e.g. `/opt/teztok`), then:

```
/opt/teztok/
  docker-compose.yml
  docker-compose.site.yml   # optional, your own; gitignored
  .env                      # from .env.sample, never committed
  db/                       # postgres data
  data/                     # app data (logs, teztok.json)
```

The base compose is self-contained: it creates its own network, publishes
nothing, and assumes every external service is reachable over the internet. It
needs no pre-existing networks.

## Site overlay

Anything that depends on where this runs goes in an overlay, so that hostnames,
network names, certificate resolvers and named middlewares stay out of this
repo. Two common cases:

- **Egress** — joining a network that already exists so the workers can reach a
  service on it directly, such as an ipfs gateway, rather than leaving the host
  and coming back in.
- **Ingress** — putting the api behind a reverse proxy.

```sh
cp docker-compose.site.example.yml docker-compose.site.yml
$EDITOR docker-compose.site.yml
```

Any external network the overlay references has to exist before `up -d`:

```sh
docker network create gateway
docker network create proxy
```

Then pass both files on **every** command, including `pull`, `stop`, `logs` and
the profile runs below:

```sh
docker compose -f docker-compose.yml -f docker-compose.site.yml up -d
```

Compose merges the files in order, so omitting the overlay silently drops
everything in it on the next `up -d`. Setting `COMPOSE_FILE` in `.env` avoids
repeating the flags:

```
COMPOSE_FILE=docker-compose.yml:docker-compose.site.yml
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

Then start hasura and tell it which tables to expose. Without this the database
is fine but the api is empty, because hasura tracks nothing by default:

```sh
docker compose up -d teztok_hasura
docker compose --profile init run --rm hasura_init
```

`hasura/metadata.json` is the tracked tables, relationships and `webuser`
permissions. It refers to the database through `HASURA_GRAPHQL_DATABASE_URL`
rather than a literal connection string, so it is portable between instances.
Applying it is idempotent. After changing anything through the hasura console,
export the metadata and commit it, or the next instance will not have it.

**From the newest S3 backup:**

```sh
docker compose --profile restore run --rm db_restore
docker compose --profile init run --rm db_init     # bring schema up to date
docker compose up -d teztok_hasura
docker compose --profile init run --rm hasura_init
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

## Testing this locally

The compose file pulls by tag and never builds, so build the image yourself and
tag it with whatever `INDEXER_TAG` you set. Compose uses a local image if one
with that exact name exists; just do not run `pull`, which would try the
registry and fail.

```sh
# from the repo root
docker build -t ghcr.io/teia-community/indexer:local .
```

The base compose needs no external networks, so nothing else is required. Test
it without a site overlay unless you are specifically testing the overlay.

Run from a directory outside the repo, which is also how a host uses it:

```sh
mkdir -p ~/teztok-test && cd ~/teztok-test
cp /path/to/repo/deploy/docker-compose.yml .
cp /path/to/repo/deploy/.env.sample .env
```

In `.env` set `INDEXER_TAG=local`, a `POSTGRES_PASSWORD`, the three
`postgres://` urls to match it, and a `TZKT_API`. Then follow **First run**
above. A fresh database starts at the beginning of the indexed range and has a
large backlog, so expect it to stay busy.

If you want it alongside another stack, set `COMPOSE_PROJECT_NAME` and change
`container_name` on the database, since a fixed container name cannot be shared.

To tear it down, including the postgres volume:

```sh
docker-compose down -v
```

Note on compose versions: `docker-compose` v1 works here, including
`--profile`, and does honour `deploy.replicas`. `docker compose` v2 is what
runs in production.

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
  `up -d` and needs no manual step. To take one immediately:
  `docker compose run --rm backup backup`.
- `SCHEDULE` accepts `@daily`, `@hourly`, or `@every <seconds>`. Anything else
  fails at startup rather than silently never running.
- Backup and restore both come from `deploy/backup`, built alongside the
  indexer and sharing `INDEXER_TAG`. `pg_dump` has to be at least the server
  version, so its base image tracks the postgres major in
  `docker-compose.yml` — **bump both together**. The previous off-the-shelf
  image only published up to 16 and silently could not dump an 18 server.
- Dumps are `pg_dump` custom format named `<database>_<timestamp>.dump`, the
  same convention as before, so older backups restore unchanged.
- The object name comes from `POSTGRES_DATABASE`, so a dump restores into the
  database it came from. Restoring into a differently named database is not
  supported.
- `PASSPHRASE` is rejected rather than ignored. The previous image could
  gpg-encrypt dumps; this one does not, and writing plaintext when encryption
  was requested would be the wrong failure.
- On restart the controller resumes from `MAX(events.level)`, so it re-indexes
  the trailing run of blocks that contained no events. That is expected and
  self-correcting.
- `S3_PREFIX` must be set in `.env`. `restore.sh` reads it under `set -u` while
  the image only defaults `S3_PATH`, so omitting it fails with an unbound
  variable error rather than a clear message.
- `PASSPHRASE` must stay empty to read existing unencrypted `.dump` files.
  Setting it changes the expected object name to `.dump.gpg` and makes older
  backups unrestorable.
