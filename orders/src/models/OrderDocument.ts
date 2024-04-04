import { OrderStatus } from '@jmsgoytia-ticketing/common';
import { TicketDocument } from './TicketDocument';
import mongoose from 'mongoose';

export interface OrderDocument extends mongoose.Document {
	expires_at: Date;
	status: OrderStatus;
	ticket: TicketDocument;
	user_id: string;
}
