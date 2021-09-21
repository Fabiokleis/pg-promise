#!/bin/sh

psql -U postgres <<EOF
create database exppg;
\c exppg
\i ./src/infra/create.sql
EOF
