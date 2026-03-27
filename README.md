# contacts-hono
Backend for contacts app using hono

## Autenticación

Se utiliza **Better Auth** con el plugin de **Organization** para gestionar autenticación y organizaciones multi-tenant.

### Características de autenticación:
- **Better Auth**: Framework de autenticación
- **Organization Plugin**: Soporte para organizaciones/multi-tenant
- **RLS (Row Level Security)**: Seguridad a nivel de fila en la base de datos
- **Middleware de Tenant**: Middleware para obtener el tenant actual de la solicitud
- **NOBYPASS_RLS**: Las políticas RLS no pueden ser saltadas (protección a nivel de base de datos)

## Formas de uso

### Clonar el repositorio

```sh
git clone https://github.com/Khr0x/contacts-hono.git
cd contacts-hono
```

### Requisitos previos

#### Instalar Bun

Si no tienes Bun instalado, ejecuta:

```sh
curl -fsSL https://bun.sh/install | bash
```

O usando Homebrew (macOS):

```sh
brew install bun
```

### 1. Local con Bun

```sh
# Copiar variables de entorno
cp .env.example .env

# Instalar dependencias
bun install

# Ejecutar en desarrollo
bun run dev
```

### 2. Docker Compose - Perfil Local

```sh
# Copiar variables de entorno
cp .env.example .env

# Ejecutar con perfil local (desarrollo)
docker compose --profile local up -d
```

### 3. Docker Compose - Perfil Staging

```sh
# Copiar variables de entorno
cp .env.example .env

# Ejecutar con perfil staging
docker compose --profile staging up -d
```

### Otros comandos

```sh
bun run dev       # Desarrollo local
open http://localhost:3000
```

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
