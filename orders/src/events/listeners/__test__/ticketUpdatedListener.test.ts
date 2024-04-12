import {
	createObjectId,
	TicketUpdatedEvent
} from '@jmsgoytia-ticketing/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../NatsWrapper';
import { Ticket } from '../../../models/ticket';
import createTicket from '../../../test/createTicket';
import TicketUpdatedListener from '../TicketUpdatedListener';

const setup = async () => {
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

	await listener.onMessage(data, msg);

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
