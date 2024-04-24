import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
	isValidState,
	requireAuth,
	validateRequest,
} from '@jmsgoytia-ticketing/common';
import CreateController from '../Controllers/CreateController';
import prefix from './prefix';

const router = express.Router();

const isValidDate = (value: string) => {
	return !isNaN(Date.parse(value));
};

router.post(
	`${prefix}/tickets`,
	requireAuth,
	[
		body('date')
			.trim()
			.notEmpty()
			.withMessage('Date required')
			.custom(isValidDate)
			.withMessage('Invalid date'),
		body('city').trim().notEmpty().withMessage('City required'),
		body('description').trim().notEmpty().withMessage('Description required'),
		body('postal_code').trim().notEmpty().withMessage('Postal code required'),
		body('price').isFloat({ gt: 0 }).withMessage('Invalid Price'),
		body('state')
			.trim()
			.notEmpty()
			.withMessage('State required')
			.custom(isValidState)
			.withMessage('Invalid state'),
		body('street_address')
			.trim()
			.notEmpty()
			.withMessage('Street address required'),
		body('title').trim().notEmpty().withMessage('Title required'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		return CreateController.handle(req, res);
	}
);

export { router as createRouter };
