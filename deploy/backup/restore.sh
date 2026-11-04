#!/bin/bash
# Restore from S3. With no argument, restores the newest backup; pass a
# timestamp as it appears in the object name to pick a specific one.
#
#   restore.sh
#   restore.sh 2026-11-04T00:08:30
#
# Takes the same arguments as the image this replaced, so existing backups made
# by that image restore unchanged.
source /common.sh

if [ "$#" -ge 1 ]; then
  file="${POSTGRES_DATABASE}_${1}.dump"
else
  echo "finding newest backup"
  file=$(aws "${AWS_ARGS[@]}" s3 ls "${S3_BASE}/" \
         | awk '{print $4}' \
         | grep -E "^${POSTGRES_DATABASE}_.*\.dump$" \
         | sort | tail -n 1)
  if [ -z "$file" ]; then
    echo "error: no backups found at ${S3_BASE}/" >&2
    exit 1
  fi
fi

local_path="/tmp/restore.dump"
echo "fetching ${file}"
if ! aws "${AWS_ARGS[@]}" s3 cp "${S3_BASE}/${file}" "$local_path"; then
  echo "error: could not fetch ${file}" >&2
  exit 1
fi

echo "verifying dump is readable"
if ! pg_restore --list "$local_path" >/dev/null 2>&1; then
  echo "error: pg_restore cannot read ${file}" >&2
  rm -f "$local_path"
  exit 1
fi

# --clean --if-exists drops existing objects first, so re-running is safe. The
# database itself must already exist.
echo "restoring into ${POSTGRES_DATABASE} on ${POSTGRES_HOST}:${POSTGRES_PORT}"
pg_restore $(conn_opts) -d "$POSTGRES_DATABASE" \
  --clean --if-exists --no-owner --no-privileges \
  ${RESTORE_JOBS:+-j "$RESTORE_JOBS"} "$local_path"
rc=$?
rm -f "$local_path"

# pg_restore exits non-zero on ignorable errors too, such as dropping an object
# that is not there on a first restore, so report rather than fail outright.
if [ "$rc" -ne 0 ]; then
  echo "restore finished with warnings (exit ${rc}); check the output above" >&2
else
  echo "restore complete"
fi
