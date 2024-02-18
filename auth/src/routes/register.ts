import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
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
	(req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).send(errors.array());
		}

		const { email, password } = req.body;

		res.send({})
	}
);

export { router as registerRouter };
