#!/bin/sh
set -e

echo "Waiting for database..."
sleep 2

echo "Running migrations..."
bun run db:migrate

echo "Starting app..."
exec bun run src/index.ts
