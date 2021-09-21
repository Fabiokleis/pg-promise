#!/bin/sh

psql -U postgres <<EOF
DROP DATABASE exppg;
\i ./src/infra/create.sql
EOF
