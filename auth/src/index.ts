import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/NotFoundError';
import routes from './routes';

const app = express();

app.use(json());

routes.forEach((route) => {
	app.use(route);
});

app.all('*', async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
