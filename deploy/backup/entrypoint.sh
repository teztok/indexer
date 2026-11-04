#!/bin/bash
# Default is the scheduler. Pass "backup" or "restore" to run one directly:
#
#   docker compose run --rm backup backup
#   docker compose run --rm backup restore 2026-11-04T00:08:30
set -euo pipefail

case "${1:-scheduler}" in
  backup)  shift; exec /backup.sh "$@" ;;
  restore) shift; exec /restore.sh "$@" ;;
  shell)   shift; exec bash "$@" ;;
  scheduler) ;;
  *) echo "usage: {scheduler|backup|restore [timestamp]|shell}" >&2; exit 1 ;;
esac

: "${SCHEDULE:=@daily}"

# Seconds until the next run. Computed from the wall clock each iteration rather
# than sleeping a fixed period, so runs stay aligned and do not drift.
seconds_until_next() {
  local now next
  now=$(date -u +%s)
  case "$SCHEDULE" in
    @daily|@midnight) next=$(date -u -d 'tomorrow 00:00' +%s) ;;
    @hourly)          next=$(date -u -d 'next hour' +%s)
                      next=$(( next - (next % 3600) )) ;;
    @every*)          echo "${SCHEDULE#@every }" | grep -qE '^[0-9]+$' || {
                        echo "error: @every needs seconds, e.g. '@every 3600'" >&2; exit 1; }
                      next=$(( now + ${SCHEDULE#@every } )) ;;
    *) echo "error: unsupported SCHEDULE '$SCHEDULE' (use @daily, @hourly, or '@every <seconds>')" >&2
       exit 1 ;;
  esac
  echo $(( next - now ))
}

# Validate before announcing anything, so a bad SCHEDULE fails immediately
# rather than after a line claiming the scheduler is up.
seconds_until_next >/dev/null

echo "scheduler started, SCHEDULE=${SCHEDULE}, keeping ${BACKUP_KEEP_DAYS:-7} days"

while true; do
  wait_for=$(seconds_until_next)
  echo "next backup in ${wait_for}s"
  sleep "$wait_for"
  # Keep the loop alive if one run fails; the failure is logged and the next
  # run still happens.
  /backup.sh || echo "backup failed, will retry on the next schedule" >&2
done
