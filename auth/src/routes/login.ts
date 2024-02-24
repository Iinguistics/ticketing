import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import prefix from './prefix';
import validateRequest from '../middlewares/validateRequest';

const router = express.Router();

router.post(
	`${prefix}/users/login`,
	[
		body('email').isEmail().withMessage('Email invalid'),
		body('password').trim().notEmpty().withMessage('Password invalid'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;
	}
);

export { router as loginRouter };
