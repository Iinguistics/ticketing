import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import {
	NotFoundError,
} from '@jmsgoytia-ticketing/common';
// import ShowController from '../Controllers/ShowController';
const mongoose = require('mongoose');
import prefix from './prefix';

const router = express.Router();

router.get(
	`${prefix}/tickets/:id`,
	async (req: Request, res: Response) => {
		// return ShowController.handle(req, res);
		const { id } = req.params;

		const ticket = await Ticket.findOne({
			_id: { $eq: new mongoose.Types.ObjectId(id) },
			deleted_at: { $eq: null },
		});

		if (!ticket) {
			throw new NotFoundError();
		}

		res.send(ticket);
	}
);

export { router as showRouter };
