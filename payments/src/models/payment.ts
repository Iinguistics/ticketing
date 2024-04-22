import { PaymentDocument } from './PaymentDocument';
import mongoose from 'mongoose';

export interface PaymentAttrs {
	order_id: string;
	stripe_id: string;
}

interface PaymentModel extends mongoose.Model<PaymentDocument> {
	build(attrs: PaymentAttrs): PaymentDocument;
}

const paymentSchema = new mongoose.Schema(
	{
		created_at: { default: Date.now, type: Date },
		order_id: {
			type: String,
			required: true,
		},
		stripe_id: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				ret.order_id = ret.user_id;
				delete ret._id;
			},
		},
	}
);

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
	return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDocument, PaymentModel>(
	'Payment',
	paymentSchema
);

export { Payment };
