#!/bin/bash

NEST_DB_MIGRATION_NAME=$1
NEST_DB_SOURCE=./dist/src/database/data-source.js

if [ -z "$NEST_DB_MIGRATION_NAME" ]; then
    echo "Please provide a migration name"
    exit 1
fi

if [ ! -d ./dist ]; then
    echo "Building the project first"
    npm run build
fi

echo "Creating the migration: $NEST_DB_MIGRATION_NAME"

npx typeorm migration:generate -d "$NEST_DB_SOURCE" -o "./dist/src/db/migrations/$NEST_DB_MIGRATION_NAME"

echo "Running the migration"

npx typeorm migration:run -d "$NEST_DB_SOURCE"