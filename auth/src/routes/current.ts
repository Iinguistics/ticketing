import express from 'express';
import jwt from 'jsonwebtoken';
import prefix from './prefix';

const router = express.Router();

router.get(`${prefix}/users/current`, (req, res) => {
	if (!req.session?.jwt) {
		return res.send({ currentUser: null });
	}

	try {
		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

		res.send({ currentUser: payload });
	} catch (error) {
		res.send({ currentUser: null });
	}
});

export { router as currentRouter };
