# Installation

If you want to run an instance of the indexer, first make sure to have **Node.js** in version 17 or higher, as well as **docker** installed. Pull the latest code from the main branch on GitHub (we'll soon be starting to version releases).

```bash
git clone git@github.com:teztok/indexer.git
```

## Running the indexer in dev/local mode

Install the Node.js dependencies by running:

```bash
npm install
```

Create a `.env` file by making a copy of `.env.sample` and modifying it to your needs.

```bash
cp .env.sample .env
```

Start Postgres and Hasura by running:

```bash
docker-compose up -d
```

Now run this command to create the database schema:

```bash
npm run init:db
```

To start the indexer run:

```bash
npm start
```

It will start indexing from block 1365000 (end of February 2021).

## Build and run the indexer through docker-compose:

Create a `.env.prod` file by making a copy of `.env.sample` and modifying it to your needs.

```bash
cp .env.sample .env.prod
```

Now create a custom docker-compose file by copying `docker-compose.prod.yml` to `docker-compose.custom.yml` and modifying it to your needs.

```bash
cp docker-compose.prod.yml docker-compose.custom.yml
```

It would take a very long time to index everything from scratch, which is why we strongly recommend downloading and importing a recent database dump from https://backups.teztok.com/daily/. This dump also contains the Hasura configuration and data from tzprofiles.

Here is an example of how such an SQL dump can be imported into a docker container running Postgres.

```bash
# Start Postgres
docker-compose -f docker-compose.custom.yml up -d teztok_database

# Import a recent dump (can take quite some time)
gunzip < teztok-20220520-000000.sql.gz | docker exec -i teztok_database psql -U teztok -d teztok

# Stop Postgres
docker-compose -f docker-compose.custom.yml down
```

Now build the docker image:

```bash
docker-compose -f docker-compose.custom.yml build
```

And then start the indexer:

```bash
docker-compose -f docker-compose.custom.yml up
```

It's recommended to download and import an SQL dump from our backup server every once in a while in order to get fixes. This way you also don't need to bother with re-indexing.

## Navigation

- [← Back to Introduction](index.md)
- [Architecture →](architecture.md)
