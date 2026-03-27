FROM oven/bun:1-debian

WORKDIR /app

COPY package.json ./
RUN bun install --frozen-lockfile --include-dev

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENV NODE_ENV=development

ENTRYPOINT ["/entrypoint.sh"]
