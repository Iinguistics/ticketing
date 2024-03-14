import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@jmsgoytia-ticketing/common';
import LoginController from '../Controllers/LoginController';
import prefix from './prefix';

const router = express.Router();

router.post(
	`${prefix}/users/login`,
	[
		body('email').isEmail().withMessage('Email invalid'),
		body('password').trim().notEmpty().withMessage('Password invalid'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		return LoginController.handle(req, res);
	}
);

export { router as loginRouter };
