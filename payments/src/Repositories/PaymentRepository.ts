import { Payment } from '../models/payment';
import { PaymentAttrs } from '../models/payment';
import { Repository } from '@jmsgoytia-ticketing/common';

class PaymentRepository extends Repository {
	#payment;

	constructor() {
		super();
		this.#payment = Payment;
	}

	async create(attrs: PaymentAttrs) {
		const payment = this.#payment.build(attrs)

		await payment.save();
	}
}

export default new PaymentRepository();
