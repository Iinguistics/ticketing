import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './Subjects';

interface Event {
	data: any;
	subject: Subjects;
}

export abstract class Listener<T extends Event> {
	abstract subject: T['subject'];
	abstract queueGroupName: string;
	abstract onMessage(data: T['data'], msg: Message): void;
	_client: Stan;
	_ackWait = 5 * 1000;

	constructor(client: Stan) {
		this._client = client;
	}

	subscriptionOptions() {
		return this._client
			.subscriptionOptions()
			.setDeliverAllAvailable()
			.setManualAckMode(true)
			.setAckWait(this._ackWait)
			.setDurableName(this.queueGroupName);
	}

	listen() {
		const subscription = this._client.subscribe(
			this.subject,
			this.queueGroupName,
			this.subscriptionOptions()
		);

		subscription.on('message', (msg: Message) => {
			console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

			const parsedData = this.#parseMessage(msg);
			this.onMessage(parsedData, msg);
		});
	}

	#parseMessage(msg: Message) {
		const data = msg.getData();
		return typeof data === 'string'
			? JSON.parse(data)
			: JSON.parse(data.toString('utf8'));
	}
}
