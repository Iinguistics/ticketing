import mongoose from 'mongoose';

export interface TicketDocument extends mongoose.Document {
	created_at: Date;
	deleted_at: Date | null;
	id: string;
	modified_at: Date;
	order_id?: string;
	price: number;
	title: string;
	user_id: string;
	version: number;
}
