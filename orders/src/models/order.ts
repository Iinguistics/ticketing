import { OrderDocument } from './OrderDocument';
import { OrderStatus } from '@jmsgoytia-ticketing/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import mongoose from 'mongoose';

export { OrderStatus };

export interface OrderAttrs {
	expires_at: Date;
	status: OrderStatus;
	ticket: mongoose.Types.ObjectId;
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
		stripe_id: {
			type: String,
		},
		ticket: {
			type: mongoose.Types.ObjectId,
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
			},
		},
	}
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
	return new Order(attrs);
};

const Order = mongoose.model<OrderDocument, OrderModel>('Order', orderSchema);

export { Order };
