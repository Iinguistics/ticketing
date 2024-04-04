import { TicketDocument } from './TicketDocument';
import mongoose from 'mongoose';

export interface TicketAttrs {
	price: number;
	title: string;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
	build(attrs: TicketAttrs): TicketDocument;
}

const ticketSchema = new mongoose.Schema(
	{
		price: {
			min: 0,
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
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
