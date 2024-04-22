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
import StripeGateway from '../Gateways/Stripe/StripeGateway';

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

		await StripeGateway.create({
			amount: order.price,
			paymentMethod: token,
	  });

		res.status(201).send({ success: true });
	}
);

export { router as createRouter };
