import { OrderStatus } from './order';
import mongoose from 'mongoose';

export interface OrderDocument extends mongoose.Document {
	created_at: Date;
	id: string;
	price: number;
	status: OrderStatus;
	user_id: string;
	version: number;
}
