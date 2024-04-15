import { Stan } from 'node-nats-streaming';
import { Subjects } from './Subjects';

interface Event {
	subject: Subjects;
	data: any;
}

export abstract class Publisher<T extends Event> {
	abstract subject: T['subject'];
	_client: Stan;

	constructor(client: Stan) {
		this._client = client;
	}

	publish(data: T['data']): Promise<void> {
		return new Promise((resolve, reject) => {
			this._client.publish(
				this.subject,
				JSON.stringify(data),
				(err: unknown) => {
					if (err) {
						return reject(err);
					}
					console.log('Event published to subject', this.subject);
					resolve();
				}
			);
		});
	}
}
