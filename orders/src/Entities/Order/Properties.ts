import { Id } from '@jmsgoytia-ticketing/common';
import { OrderStatus } from '../../models/order';
import { TicketDocument } from '../../models/TicketDocument';

type Properties = Readonly<{
	createdAt: Date;
	expiresAt: Date;
	id: Id;
	status: OrderStatus;
	ticket: TicketDocument;
	userId: Id;
	version: number;
}>;

export default Properties;
