import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import {
	isValidState,
	requireAuth,
	validateRequest,
} from '@jmsgoytia-ticketing/common';
import prefix from './prefix';
import UpdateController from '../Controllers/UpdateController';

const router = express.Router();

const isValidDate = (value: string) => {
	return !isNaN(Date.parse(value));
};

router.put(
	`${prefix}/tickets/:id`,
	requireAuth,
	[
		body('city').trim().notEmpty().withMessage('City required'),
		body('date')
			.trim()
			.notEmpty()
			.withMessage('Date required')
			.custom(isValidDate)
			.withMessage('Invalid date'),
		body('description'),
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
