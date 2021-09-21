create table users (
    id serial primary key,
    name text not null unique,
    password text not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);
