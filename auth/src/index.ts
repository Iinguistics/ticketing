import mongoose from 'mongoose';
import { app } from './app';
import checkEnvVars from './helpers/checkEnvVars';

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
