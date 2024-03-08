import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@jmsgoytia-ticketing/common';
import prefix from './prefix';
import RegisterController from '../Controllers/RegisterController';

const router = express.Router();

router.post(
	`${prefix}/users/register`,
	[
		body('email').isEmail().withMessage('Email invalid'),
		body('password')
			.trim()
			.isLength({ min: 6, max: 18 })
			.withMessage('Password invalid'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		return RegisterController.handle(req, res);
	}
);

export { router as registerRouter };
