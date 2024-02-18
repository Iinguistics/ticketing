import express from 'express';
import prefix from './prefix';

const router = express.Router();

router.get(`${prefix}/users/current`, (req, res) => {
	res.send('current hit')
});

export { router as currentRouter };
