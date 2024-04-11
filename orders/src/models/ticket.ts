import { Order, OrderStatus } from './order';
import { TicketDocument } from './TicketDocument';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import mongoose from 'mongoose';

export interface TicketAttrs {
	_id: string;
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
			},
		},
	}
);

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

// ticketSchema.pre('save', function (done) {
// 	this.$where = {
// 		version: this.get('version') - 1,
// 	};

// 	done();
// });

ticketSchema.statics.build = (attrs: TicketAttrs) => {
	return new Ticket(attrs);
};

ticketSchema.methods.isReserved = async function () {
	const existingOrder = await Order.findOne({
		ticket: this,
		status: {
			$in: [
				OrderStatus.AwaitingPayment,
				OrderStatus.Complete,
				OrderStatus.Created,
			],
		},
	});

	return !!existingOrder;
};

const Ticket = mongoose.model<TicketDocument, TicketModel>(
	'Ticket',
	ticketSchema
);

export { Ticket };
