import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@jmsgoytia-ticketing/common';
import { param } from 'express-validator';
import prefix from './prefix';
import ShowController from '../Controllers/ShowController';

const router = express.Router();

router.get(
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
		return ShowController.handle(req, res);
	}
);

export { router as showRouter };
