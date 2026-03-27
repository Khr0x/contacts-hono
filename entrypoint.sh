#!/bin/sh
set -e

echo "Waiting for database..."
sleep 2

if [ "$ENV_TARGET" = "staging" ]; then
    echo "Skipping migrations on staging..."
else
    echo "Running migrations..."
    bun run db:migrate
fi

echo "Starting app..."
exec bun run src/index.ts
