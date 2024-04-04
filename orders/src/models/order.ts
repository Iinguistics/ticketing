import { OrderDocument } from './OrderDocument';
import { OrderStatus } from '@jmsgoytia-ticketing/common';
import { TicketDocument } from './TicketDocument';
import mongoose from 'mongoose';

export interface OrderAttrs {
	expires_at: Date;
	status: OrderStatus;
	ticket: TicketDocument;
	user_id: string;
}

interface OrderModel extends mongoose.Model<OrderDocument> {
	build(attrs: OrderAttrs): OrderDocument;
}

const orderSchema = new mongoose.Schema(
	{
		created_at: { default: Date.now, type: Date },
		deleted_at: { default: null, type: Date },
		expires_at: { default: null, type: Date },
		status: {
			default: OrderStatus.Created,
			enum: Object.values(OrderStatus),
			type: String,
			required: true,
		},
		ticket: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Ticket',
		},
		user_id: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				ret.user_id = ret.user_id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
	return new Order(attrs);
};

const Order = mongoose.model<OrderDocument, OrderModel>('Order', orderSchema);

export { Order };
