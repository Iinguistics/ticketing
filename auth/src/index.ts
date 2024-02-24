import cookieSession from 'cookie-session';
import express from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors';
import checkEnvVars from './helpers/checkEnvVars';
import routes from './routes';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: true,
	})
);

routes.forEach((route) => {
	app.use(route);
});

app.all('*', async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
	checkEnvVars();

	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/ticketing_auth');

		console.log('Connected to mongodb');
	} catch (error) {
		console.error(error);
	}

	app.listen(3000, () => {
		console.log('Listening on port 3000');
	});
};

start();
