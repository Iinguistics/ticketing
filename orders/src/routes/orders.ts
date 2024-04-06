import express, { Request, Response } from 'express';
import { requireAuth } from '@jmsgoytia-ticketing/common';
import OrdersController from '../Controllers/OrdersController';
import prefix from './prefix';

const router = express.Router();

router.get(
	`${prefix}/orders`,
	requireAuth,
	async (req: Request, res: Response) => {
		return OrdersController.handle(req, res);
	}
);

export { router as ordersRouter };
