import {
	createObjectId,
	TicketCreatedEvent,
} from '@jmsgoytia-ticketing/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../NatsWrapper';
import { Ticket } from '../../../models/ticket';
import TicketCreatedListener from '../TicketCreatedListener';

const price = 20;
const title = 'concert';

const setup = async () => {
	const listener = new TicketCreatedListener(natsWrapper.client);

	const data: TicketCreatedEvent['data'] = {
		id: createObjectId(),
		price,
		title,
		userId: createObjectId(),
	};

	// @ts-ignore only need ack for this
	const msg: Message = {
		ack: jest.fn(),
	};

	await listener.onMessage(data, msg);

	return { listener, data, msg };
};

it('creates and saves a ticket', async () => {
	const { data } = await setup();

	const ticket = await Ticket.findById(data.id);

	expect(ticket).toBeDefined();
	expect(ticket?.price).toEqual(price);
	expect(ticket?.title).toEqual(title);
});

it('acknowledges the message', async () => {
	const { msg } = await setup();

	expect(msg.ack).toHaveBeenCalled();
});
