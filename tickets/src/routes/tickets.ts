import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
// import TicketsController from '../Controllers/TicketsController';
import prefix from './prefix';

const router = express.Router();

router.get(
	`${prefix}/tickets`,
	async (req: Request, res: Response) => {
		// return TicketsController.handle(req, res);
		const tickets = await Ticket.find({})

		res.send(tickets);
	}
);

export { router as ticketsRouter };
