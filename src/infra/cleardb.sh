#!/bin/sh

psql -U postgres <<EOF
\c exppg
DROP TABLE users;
\i ./src/infra/create.sql
EOF
