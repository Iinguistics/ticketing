import { TicketDocument } from './TicketDocument';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import mongoose from 'mongoose';

export interface TicketAttrs {
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
