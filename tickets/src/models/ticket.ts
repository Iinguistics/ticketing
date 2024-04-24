import { Address, TicketDocument } from './TicketDocument';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import mongoose from 'mongoose';

export interface TicketAttrs {
	address: Address;
	date: string;
	price: number;
	title: string;
	user_id: string;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
	build(attrs: TicketAttrs): TicketDocument;
}

const ticketSchema = new mongoose.Schema(
	{
		address: {
			city: {
				type: String,
				required: true,
			},
			postal_code: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
			},
			street_address: {
				type: String,
				required: true,
			},
		},
		created_at: { default: Date.now, type: Date },
		date: {
			type: Date,
			required: true,
		},
		deleted_at: { default: null, type: Date },
		modified_at: { default: Date.now, type: Date },
		order_id: {
			type: String,
		},
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

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
	return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDocument, TicketModel>(
	'Ticket',
	ticketSchema
);

export { Ticket };
