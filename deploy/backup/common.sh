#!/bin/bash
# Shared env handling. Variable names match the image this replaced, so an
# existing .env works unchanged.
set -euo pipefail

require() {
  local name="$1"
  if [ -z "${!name:-}" ]; then
    echo "error: $name is not set" >&2
    exit 1
  fi
}

require POSTGRES_DATABASE
require POSTGRES_HOST
require POSTGRES_USER
require POSTGRES_PASSWORD
require S3_BUCKET

: "${POSTGRES_PORT:=5432}"
: "${S3_PREFIX:=backup}"
: "${S3_REGION:=us-east-1}"
: "${S3_ENDPOINT:=}"
: "${BACKUP_KEEP_DAYS:=7}"
: "${PASSPHRASE:=}"

# The replaced image could gpg-encrypt dumps. That is not implemented here, and
# silently writing plaintext when encryption was asked for would be worse than
# refusing.
if [ -n "$PASSPHRASE" ]; then
  echo "error: PASSPHRASE is set but this image does not implement encryption." >&2
  echo "       Unset it, or encrypt at the bucket instead." >&2
  exit 1
fi

export PGPASSWORD="$POSTGRES_PASSWORD"
export AWS_ACCESS_KEY_ID="${S3_ACCESS_KEY_ID:-}"
export AWS_SECRET_ACCESS_KEY="${S3_SECRET_ACCESS_KEY:-}"
export AWS_DEFAULT_REGION="$S3_REGION"

AWS_ARGS=()
[ -n "$S3_ENDPOINT" ] && AWS_ARGS=(--endpoint-url "$S3_ENDPOINT")

S3_BASE="s3://${S3_BUCKET}/${S3_PREFIX}"

conn_opts() {
  printf '%s' "-h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER"
}
