import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import {
	requireAuth,
	validateRequest,
} from '@jmsgoytia-ticketing/common';
import prefix from './prefix';
import UpdateController from '../Controllers/UpdateController';

const router = express.Router();

router.put(
	`${prefix}/tickets/:id`,
	requireAuth,
	[
		body('price').isFloat({ gt: 0 }).withMessage('Invalid Price'),
		body('title').trim().notEmpty().withMessage('Title required'),
		param('id')
			.notEmpty()
			.withMessage('ticket id is required')
			.isMongoId()
			.withMessage('id must be a valid ObjectId'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		return UpdateController.handle(req, res);
	}
);

export { router as updateRouter };
