import { Payment } from '../models/payment';
import { PaymentDocument } from '../models/PaymentDocument';
import { PaymentAttrs } from '../models/payment';
import { Repository } from '@jmsgoytia-ticketing/common';

class PaymentRepository extends Repository {
	#payment;

	constructor() {
		super();
		this.#payment = Payment;
	}

	async create(attrs: PaymentAttrs): Promise<PaymentDocument> {
		const payment = this.#payment.build(attrs);

		await payment.save();

		return payment;
	}
}

export default new PaymentRepository();
