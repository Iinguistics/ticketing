import mongoose from 'mongoose';

export type Address = Readonly<{
	city: string;
	postal_code: string;
	state: string;
	street_address: string;
}>;

export interface TicketDocument extends mongoose.Document {
	address: Address;
	created_at: Date;
	date: Date;
	deleted_at: Date | null;
	id: string;
	modified_at: Date;
	order_id?: string;
	price: number;
	title: string;
	user_id: string;
	version: number;
}
