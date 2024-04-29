import { STRIPE_API_VERSION } from '../../local/config';
import Create from './Create';
import Stripe from 'stripe';

class StripeGateWay {
	#currency = 'usd';
	#stripe = new Stripe(process.env.STRIPE_KEY!, {
		apiVersion: STRIPE_API_VERSION,
	});

	async createIntent(
		data: Create,
		returnUrl?: string
	): Promise<Stripe.PaymentIntent> {
		try {
			const paymentIntent = await this.#stripe.paymentIntents.create({
				amount: data.amount * 100,
				currency: this.#currency,
				payment_method: data.paymentMethod,
				automatic_payment_methods: {
					enabled: true,
					allow_redirects: returnUrl ? 'always' : 'never',
				},
				...(returnUrl && { return_url: returnUrl }),
			});

			return this.#stripe.paymentIntents.confirm(paymentIntent.id, {
				return_url: returnUrl,
			});
		} catch (error) {
			console.error('Error creating PaymentIntent:', error);
			throw error;
		}
	}

	async listIntents(
		limit: number | undefined = 50
	): Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentIntent>>> {
		try {
			return this.#stripe.paymentIntents.list({ limit });
		} catch (error) {
			console.error('Error retrieving charge list:', error);
			throw error;
		}
	}

	async retrieve(id: string): Promise<Stripe.Response<Stripe.PaymentIntent>> {
		try {
			return this.#stripe.paymentIntents.retrieve(id);
		} catch (error) {
			console.error(`Error retrieving charge ID: ${id}`, error);
			throw error;
		}
	}

	async create(data: Create) {
		return this.#stripe.charges.create({
			amount: data.amount * 100,
			currency: this.#currency,
			source: data.paymentMethod,
		});
	}

	async list(
		limit: number | undefined = 50
	): Promise<Stripe.ApiListPromise<Stripe.Charge>> {
		try {
			return this.#stripe.charges.list({ limit });
		} catch (error) {
			console.error('Error retrieving charge list:', error);
			throw error;
		}
	}
}

export default new StripeGateWay();
