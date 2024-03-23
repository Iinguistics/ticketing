import { TicketDocument } from './TicketDocument';
import mongoose from 'mongoose';

interface TicketAttrs {
	price: number;
	title: string;
	user_id: string;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
	build(attrs: TicketAttrs): TicketDocument;
}

const ticketSchema = new mongoose.Schema(
	{
		created_at: { default: Date.now, type: Date },
		deleted_at: { default: null, type: Date },
		modified_at: { default: Date.now, type: Date },
		price: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		user_id: {
			type: String,
			ref: 'User',
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

ticketSchema.statics.build = (attrs: TicketAttrs) => {
	return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDocument, TicketModel>(
	'Ticket',
	ticketSchema
);

export { Ticket };
