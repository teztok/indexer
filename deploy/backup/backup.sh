#!/bin/bash
# Dump the database to S3 in pg_dump custom format, then prune old objects.
# Object name matches what the previous image produced, so old and new backups
# sort together and restore identically: <database>_<timestamp>.dump
source /common.sh

timestamp=$(date -u +%Y-%m-%dT%H:%M:%S)
file="${POSTGRES_DATABASE}_${timestamp}.dump"
local_path="/tmp/${file}"

echo "dumping ${POSTGRES_DATABASE} from ${POSTGRES_HOST}:${POSTGRES_PORT}"
# Dump to a temp file rather than piping to S3: a mid-stream failure would
# otherwise leave a truncated object that looks like a valid backup.
if ! pg_dump $(conn_opts) -d "$POSTGRES_DATABASE" -Fc -f "$local_path"; then
  echo "error: pg_dump failed, nothing uploaded" >&2
  rm -f "$local_path"
  exit 1
fi

size=$(stat -c %s "$local_path")
if [ "$size" -lt 1024 ]; then
  echo "error: dump is only ${size} bytes, refusing to upload" >&2
  rm -f "$local_path"
  exit 1
fi

echo "verifying dump is readable"
if ! pg_restore --list "$local_path" >/dev/null 2>&1; then
  echo "error: pg_restore cannot read the dump, refusing to upload" >&2
  rm -f "$local_path"
  exit 1
fi

echo "uploading ${file} ($(numfmt --to=iec "$size"))"
if ! aws "${AWS_ARGS[@]}" s3 cp "$local_path" "${S3_BASE}/${file}"; then
  echo "error: upload failed" >&2
  rm -f "$local_path"
  exit 1
fi
rm -f "$local_path"

if [ "$BACKUP_KEEP_DAYS" -gt 0 ]; then
  cutoff=$(date -u -d "${BACKUP_KEEP_DAYS} days ago" +%Y-%m-%d)
  echo "pruning backups older than ${cutoff}"
  aws "${AWS_ARGS[@]}" s3 ls "${S3_BASE}/" \
    | awk '{print $4}' \
    | grep -E "^${POSTGRES_DATABASE}_[0-9]{4}-[0-9]{2}-[0-9]{2}T" \
    | while read -r key; do
        key_date="${key#${POSTGRES_DATABASE}_}"
        key_date="${key_date%%T*}"
        if [[ "$key_date" < "$cutoff" ]]; then
          echo "  removing ${key}"
          aws "${AWS_ARGS[@]}" s3 rm "${S3_BASE}/${key}"
        fi
      done
fi

echo "backup complete: ${file}"
