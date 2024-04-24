import { Address } from '../models/TicketDocument';
import mongoose from 'mongoose';

type UpdateData = {
	address: Address,
	date: Date;
	description: string | null;
	modified_at: number;
	order_id?: mongoose.Types.ObjectId;
	price: number;
	title: string;
};

export default UpdateData;
