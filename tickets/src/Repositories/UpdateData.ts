import mongoose from 'mongoose';

type UpdateData = {
	modified_at: number;
	order_id?: mongoose.Types.ObjectId;
	price: number;
	title: string;
};

export default UpdateData;
