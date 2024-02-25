import express, { Request, Response } from 'express';
import { BadRequestError } from '../errors';
import { body } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import Password from '../helpers/password';
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

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			throw new BadRequestError(`Email: ${email} not found`);
		}

		if (!(await Password.compare(existingUser.password, password))) {
			throw new BadRequestError('Invalid credentials');
		}

		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
			},
			process.env.JWT_KEY!
		);

		req.session = {
			jwt: userJwt,
		};

		res.status(200).send(existingUser);
	}
);

export { router as loginRouter };
