import { Hono } from 'hono';
import { Ai } from '@cloudflare/ai';

export interface Env {
	AI: any;
}

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
	const ai = new Ai(c.env.AI);

	const content = c.req.query('query') || 'tell me a joke about cloudflare';
	const messages = [
		{ role: 'system', content: 'you are a very funny comedian and you like emojis' },
		{ role: 'user', content },
	];
	const inputs = { messages };
	const res = await ai.run('@cf/mistral/mistral-7b-instruct-v0.1', inputs);
	return c.json(res);
});

export default app;
