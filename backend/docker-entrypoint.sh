#!/bin/sh

MAX_ATTEMPTS=3
ATTEMPT=1
TIMEOUT=5

echo "Waiting for POSTGRES to start..."

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    ./wait-for db:5432 --timeout=$TIMEOUT -- echo "Postgres is up"

    if [ $? -eq 0 ]; then
        break
    fi

    echo "Attempt $ATTEMPT failed, retrying..."
    ATTEMPT=$((ATTEMPT + 1))
    sleep 5
done

echo "Migrating the database..."
npm run db:migrate

echo "Seeding the database..."
npm run db:seed

echo "Starting the server..."
exec node dist/src/main
