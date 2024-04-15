import {
	createObjectId,
	TicketUpdatedEvent,
} from '@jmsgoytia-ticketing/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../NatsWrapper';
import { Ticket } from '../../../models/ticket';
import createTicket from '../../../test/createTicket';
import TicketUpdatedListener from '../TicketUpdatedListener';

const setup = async (invokeOnMessage: boolean | undefined = true) => {
	const ticket = await createTicket();

	const listener = new TicketUpdatedListener(natsWrapper.client);

	const data: TicketUpdatedEvent['data'] = {
		id: ticket.id,
		price: 25,
		title: 'new title',
		userId: createObjectId(),
		version: ticket.version + 1,
	};

	// @ts-ignore only need ack for this
	const msg: Message = {
		ack: jest.fn(),
	};

	if (invokeOnMessage) {
		await listener.onMessage(data, msg);
	}

	return { listener, data, msg, ticket };
};

it('finds, updates and saves a ticket', async () => {
	const { data, ticket } = await setup();

	const updatedTicket = await Ticket.findById(ticket.id);

	expect(updatedTicket).toBeDefined();
	expect(updatedTicket?.price).toEqual(data.price);
	expect(updatedTicket?.title).toEqual(data.title);
	expect(updatedTicket?.version).toEqual(data.version);
});

it('acknowledges the message', async () => {
	const { msg } = await setup();

	expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has an incorrect, skipped version number', async () => {
	const { data, listener, msg } = await setup(false);

	data.version = 5;

	try {
		await listener.onMessage(data, msg);
	} catch (error) {}

	expect(msg.ack).not.toHaveBeenCalled();
});
