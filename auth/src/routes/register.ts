import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError, RequestValidationError } from '../errors';
import { User } from '../models/user';
import prefix from './prefix';

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
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new RequestValidationError(errors.array());
		}

		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError('Email already in use');
		}

		const user = User.build({ email, password });

		await user.save();

		res.status(201).send(user);
	}
);

export { router as registerRouter };
