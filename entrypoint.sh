#!/bin/sh
set -e

# Extract host and port from DATABASE_URL
DB_HOST=$(echo "$DATABASE_URL" | sed -E 's|.*@([^:]+):.*|\1|')
DB_PORT=$(echo "$DATABASE_URL" | sed -E 's|.*:([0-9]+)/.*|\1|')

# Run migrate only if local database (localhost or db)
if [ "$DB_HOST" = "localhost" ] || [ "$DB_HOST" = "db" ]; then
    echo "Waiting for database at $DB_HOST:$DB_PORT..."
    
    # Wait for PostgreSQL to be ready
    max_attempts=30
    attempt=0
    until nc -z "$DB_HOST" "$DB_PORT" 2>/dev/null || [ $attempt -eq $max_attempts ]; do
        attempt=$((attempt + 1))
        echo "Waiting for database... attempt $attempt/$max_attempts"
        sleep 1
    done
    
    if [ $attempt -eq $max_attempts ]; then
        echo "ERROR: Database not available after $max_attempts seconds"
        exit 1
    fi
    
    echo "Database is ready! Running migrations..."
    bun run db:migrate
else
    echo "Skipping migrations (external database at $DB_HOST)..."
fi

echo "Starting app..."
exec bun run src/index.ts
