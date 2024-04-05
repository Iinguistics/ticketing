import mongoose from 'mongoose';

export interface TicketDocument extends mongoose.Document {
	isReserved: () => Promise<boolean>;
	price: number;
	title: string;
}
