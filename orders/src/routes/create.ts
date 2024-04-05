import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@jmsgoytia-ticketing/common';
import CreateController from '../Controllers/CreateController';
import prefix from './prefix';

const router = express.Router();

router.post(
	`${prefix}/orders`,
	requireAuth,
	[
		body('ticket_id')
			.notEmpty()
			.withMessage('ticket id is required')
			.isMongoId()
			.withMessage('id must be a valid ObjectId'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		return CreateController.handle(req, res);
	}
);

export { router as createRouter };
