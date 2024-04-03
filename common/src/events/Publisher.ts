import { Stan } from 'node-nats-streaming';
import { Subjects } from './Subjects';

//TODO: move nats wrapper to common & couple client here
// removes the need to pass in client on every publish

interface Event {
	subject: Subjects;
	data: any;
}

export abstract class Publisher<T extends Event> {
	abstract subject: T['subject'];
	#client: Stan;

	constructor(client: Stan) {
		this.#client = client;
	}

	publish(data: T['data']): Promise<void> {
		return new Promise((resolve, reject) => {
			this.#client.publish(
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
