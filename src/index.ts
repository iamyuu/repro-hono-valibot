import { serve } from "@hono/node-server";
import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import * as v from "valibot";

const app = new Hono();

const LoginSchema = v.object({
	email: v.string(),
	password: v.string(),
});

app
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.post("/", vValidator("json", LoginSchema), async (c) => {
		const body = await c.req.json();
		return c.json({ body });
	});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});
