# pg_dump/pg_restore must be at least the server version, so this tracks the
# postgres major used in docker-compose.yml. Bump both together.
FROM postgres:18

RUN apt-get update \
 && apt-get install -y --no-install-recommends awscli ca-certificates \
 && rm -rf /var/lib/apt/lists/*

COPY backup.sh restore.sh entrypoint.sh common.sh /
RUN chmod +x /backup.sh /restore.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
