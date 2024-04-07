import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@jmsgoytia-ticketing/common';
import { param } from 'express-validator';
import CancelController from '../Controllers/CancelController';
import prefix from './prefix';

const router = express.Router();

router.patch(
	`${prefix}/orders/:id`,
	requireAuth,
	[
		param('id')
			.notEmpty()
			.withMessage('id is required')
			.isMongoId()
			.withMessage('id must be a valid ObjectId'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		return CancelController.handle(req, res);
	}
);

export { router as cancelRouter };
