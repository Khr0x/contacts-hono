# contacts-hono
Backend for contacts app using hono


To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

## Database Migrations

### 1. Configurar variables de entorno

Crea un archivo `.env` basado en `.env.example` y configura tu `DATABASE_URL`.

### 2. Generar migraciones

Después de modificar los schemas, genera los archivos de migración:

```sh
bun run db:generate
```

### 3. Aplicar migraciones

Para aplicar las migraciones a la base de datos:

```sh
bun run db:migrate
```

### Otros comandos útiles

```sh
bun run db:push    # Push schema directamente (sin migrations)
bun run db:studio  # Abrir Drizzle Studio para explorar la DB
```
