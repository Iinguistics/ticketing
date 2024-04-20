import { BULL_QUEUE_NAME } from '../local/config';
import { natsWrapper } from '../NatsWrapper';
import ExpirationCompletePublisher from '../events/publishers/ExpirationCompletePublisher';
import Payload from './Payload';
import Queue from 'bull';

const expirationQueue = new Queue<Payload>(BULL_QUEUE_NAME, {
	redis: {
		host: process.env.REDIS_HOST,
	},
});

expirationQueue.process(async (job) => {
	new ExpirationCompletePublisher(natsWrapper.client).publish({
		orderId: job.data.orderId,
	});
});

export default expirationQueue;
