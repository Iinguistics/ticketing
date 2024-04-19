import { checkEnvVars } from '@jmsgoytia-ticketing/common';
import { natsWrapper } from './NatsWrapper';

const start = async () => {
	checkEnvVars(['NATS_CLIENT_ID', 'NATS_CLUSTER_ID', 'NATS_URL']);

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
	} catch (error) {
		console.error(error);
	}
};

start();
