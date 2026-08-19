#!/bin/bash
set -euo pipefail

psql \
  --username "$POSTGRES_USER" \
  --dbname "$POSTGRES_DB" \
  --set=app_password="$TMK_APP_PASSWORD" <<'EOSQL'
CREATE ROLE tmk_app
    WITH LOGIN
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    NOREPLICATION
    PASSWORD :'app_password';

CREATE DATABASE tmk_db OWNER tmk_app;
EOSQL
