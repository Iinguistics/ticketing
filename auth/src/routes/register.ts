import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import prefix from './prefix';
import validateRequest from '../middlewares/validateRequest';

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
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError(`Email: ${email} already in use`);
		}

		const user = User.build({ email, password });

		await user.save();

		const userJwt = jwt.sign(
			{
				userId: user.id,
				userEmail: user.email,
			},
			// ! for ts error, checked in index
			process.env.JWT_KEY!
		);

		req.session = {
			jwt: userJwt,
		};

		res.status(201).send(user);
	}
);

export { router as registerRouter };
