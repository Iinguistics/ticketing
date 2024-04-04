import mongoose from 'mongoose';

export interface TicketDocument extends mongoose.Document {
	price: number;
	title: string;
}
