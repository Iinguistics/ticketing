import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { natsWrapper } from '../NatsWrapper';
import { Ticket } from '../models/ticket';
import {
	requireAuth,
	validateRequest,
	NotAuthorizedError,
	NotFoundError,
} from '@jmsgoytia-ticketing/common';
// import UpdateController from '../Controllers/UpdateController';
import TicketUpdatedPublisher from '../events/publishers/TicketUpdatedPublisher';
const mongoose = require('mongoose');
import prefix from './prefix';

const router = express.Router();

router.put(
	`${prefix}/tickets/:id`,
	requireAuth,
	[
		body('price').isFloat({ gt: 0 }).withMessage('Invalid Price'),
		body('title').trim().notEmpty().withMessage('Title required'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		// return UpdateController.handle(req, res);
		const { id } = req.params;

		const ticket = await Ticket.findOne({
			_id: { $eq: new mongoose.Types.ObjectId(id) },
			deleted_at: { $eq: null },
		});

		if (!ticket) {
			throw new NotFoundError();
		}

		if (ticket.user_id !== req.currentUser!.id) {
			throw new NotAuthorizedError();
		}

		ticket.set({
			price: req.body.price,
			title: req.body.title,
		});

		await ticket.save();

		new TicketUpdatedPublisher(natsWrapper.client).publish({
			id: ticket.id,
			price: ticket.price,
			title: ticket.title,
			userId: ticket.user_id,
		});

		res.send(ticket);
	}
);

export { router as updateRouter };
