import mongoose from 'mongoose';

export interface TicketDocument extends mongoose.Document {
	id: string;
	isReserved: () => Promise<boolean>;
	price: number;
	title: string;
}
