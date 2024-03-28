import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@jmsgoytia-ticketing/common';
import CreateController from '../Controllers/CreateController';
import prefix from './prefix';

const router = express.Router();

router.post(
	`${prefix}/tickets`,
	requireAuth,
	[
		body('price').isFloat({ gt: 0 }).withMessage('Invalid Price'),
		body('title').trim().notEmpty().withMessage('Title required'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		return CreateController.handle(req, res);
	}
);

export { router as createRouter };
