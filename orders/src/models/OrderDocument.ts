import { OrderStatus } from './order';
import { TicketDocument } from './TicketDocument';
import mongoose from 'mongoose';

export interface OrderDocument extends mongoose.Document {
	created_at: Date;
	expires_at: Date;
	id: string;
	status: OrderStatus;
	stripe_id?: string;
	ticket: TicketDocument;
	user_id: string;
	version: number;
}
