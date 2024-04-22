import mongoose from 'mongoose';

export interface PaymentDocument extends mongoose.Document {
	id: string;
	created_at: Date;
	order_id: string;
	stripe_id: string;
}
