import './src/config';
import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { auth } from '../src/lib/auth';
import { router as contactRouter } from '../src/modules/contacts/contact.router';
import { handle } from 'hono/vercel';

const app = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null
	}
}>();

app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
  	if (!session) {
    	c.set("user", null);
    	c.set("session", null);
    	await next();
        return;
  	}
  	c.set("user", session.user);
  	c.set("session", session.session);
  	await next();
});


app.get('/', (c) => {
  return c.text('Hello Hono by Cristian Mendez!')
});

app.get('/health', (c) => {
  return c.json({ status: 'Healthy check is OK' });
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

app.route("/api/contacts", contactRouter);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handle(app);