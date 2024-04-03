import { natsWrapper } from './NatsWrapper';
import app from './app';
import checkEnvVars from './helpers/checkEnvVars';
import mongoose from 'mongoose';

const start = async () => {
	checkEnvVars();

	try {
		await natsWrapper.connect(
			process.env.NATS_CLUSTER_ID!,
			process.env.NATS_CLIENT_ID!,
			process.env.NATS_URL!
		);
		natsWrapper.client.on('close', () => {
			console.log('NATS conn closed');
			process.exit();
		});
		process.on('SIGINT', () => natsWrapper.client.close());
		process.on('SIGTERM', () => natsWrapper.client.close());

		await mongoose.connect(process.env.MONGO_URI!);
		console.log('Connected to mongodb');
	} catch (error) {
		console.error(error);
	}

	app.listen(3000, () => {
		console.log('Listening on port 3000');
	});
};

start();
