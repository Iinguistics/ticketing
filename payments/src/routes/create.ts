import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
	BadRequestError,
	NotAuthorizedError,
	NotFoundError,
	OrderStatus,
	requireAuth,
	validateRequest,
} from '@jmsgoytia-ticketing/common';
// import CreateController from '../Controllers/CreateController';
import prefix from './prefix';

import { Order } from '../models/order';
import PaymentRepository from '../Repositories/PaymentRepository';
import StripeGateway from '../Gateways/Stripe/StripeGateway';
import PaymentCreatedPublisher from '../events/publishers/PaymentCreatedPublisher';
import { natsWrapper } from '../NatsWrapper';

const router = express.Router();

router.post(
	`${prefix}/payments`,
	requireAuth,
	[
		body('order_id')
			.notEmpty()
			.withMessage('Order Id required')
			.isMongoId()
			.withMessage('id must be a valid ObjectId'),
		body('token').notEmpty().withMessage('Token required'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		// return CreateController.handle(req, res);
		const { order_id, token } = req.body;

		const order = await Order.findById(order_id);

		if (!order) {
			throw new NotFoundError();
		}

		if (order.user_id !== req.currentUser!.id) {
			throw new NotAuthorizedError();
		}

		if (order.status === OrderStatus.Cancelled) {
			throw new BadRequestError('Cannot pay for a cancelled order');
		}

		const stripeCharge = await StripeGateway.create({
			amount: order.price,
			paymentMethod: token,
		});

		const paymentDocument = await PaymentRepository.create({
			order_id: order.id,
			stripe_id: stripeCharge.id,
		});

		new PaymentCreatedPublisher(natsWrapper.client).publish({
			id: paymentDocument.id,
			orderId: paymentDocument.order_id,
			stripeId: paymentDocument.stripe_id,
		});

		res
			.status(201)
			.send({ id: paymentDocument.id, stripe_id: paymentDocument.stripe_id });
	}
);

export { router as createRouter };
