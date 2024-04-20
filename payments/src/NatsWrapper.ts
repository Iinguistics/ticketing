import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
	#client?: Stan;

	get client(): Stan {
		if (!this.#client) {
			throw new Error('NATS client not connected');
		}

		return this.#client;
	}

	connect(clusterId: string, clientId: string, url: string) {
		this.#client = nats.connect(clusterId, clientId, { url });

		return new Promise<void>((resolve, reject) => {
			this.client.on('connect', () => {
				console.log('Connected to NATS');
				resolve();
			});

			this.client.on('error', (error) => {
				console.log('Unable to connect');
				reject(error);
			});
		});
	}
}

export const natsWrapper = new NatsWrapper();
