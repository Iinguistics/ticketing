import express, { Request, Response } from 'express';
import TicketsController from '../Controllers/TicketsController';
import prefix from './prefix';

const router = express.Router();

router.get(`${prefix}/tickets`, async (req: Request, res: Response) => {
	return TicketsController.handle(req, res);
});

export { router as ticketsRouter };
