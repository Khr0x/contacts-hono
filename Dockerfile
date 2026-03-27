FROM oven/bun:1-debian

WORKDIR /app

# Install netcat for health checks
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN bun install --frozen-lockfile --include-dev

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENV NODE_ENV=development

ENTRYPOINT ["/entrypoint.sh"]
