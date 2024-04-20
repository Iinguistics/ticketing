import { BULL_QUEUE_NAME } from '../local/config';
import Payload from './Payload';
import Queue from 'bull';

const expirationQueue = new Queue<Payload>(BULL_QUEUE_NAME, {
	redis: {
		host: process.env.REDIS_HOST,
	},
});

expirationQueue.process(async (job) => {});

export default expirationQueue;
