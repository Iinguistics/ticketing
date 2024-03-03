import { currentUser } from '@jmsgoytia-ticketing/common';
import express from 'express';
import prefix from './prefix';

const router = express.Router();

router.get(`${prefix}/users/current`, currentUser, (req, res) => {
	res.send({ currentUser: req.currentUser ?? null });
});

export { router as currentRouter };
