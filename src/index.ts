import './config';
import { Hono } from 'hono'
import { auth } from "./lib/auth";
import { cors } from 'hono/cors';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.use(
	"/api/auth/*",
	cors({
		origin: "*",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);


app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});


export default app
