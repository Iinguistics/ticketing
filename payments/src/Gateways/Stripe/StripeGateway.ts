import { STRIPE_API_VERSION } from '../../local/config';
import Create from './Create';
import Stripe from 'stripe';

class StripeGateWay {
	#currency = 'usd';
	#stripe = new Stripe(process.env.STRIPE_KEY!, {
		apiVersion: STRIPE_API_VERSION,
	});

	async create(data: Create): Promise<Stripe.PaymentIntent> {
		try {
			const paymentIntent = await this.#stripe.paymentIntents.create({
				amount: data.amount * 100,
				currency: this.#currency,
				payment_method: data.paymentMethod,
			});

			return this.#stripe.paymentIntents.confirm(paymentIntent.id);
		} catch (error) {
			console.error('Error creating PaymentIntent:', error);
			throw error;
		}
	}
}

export default new StripeGateWay();
