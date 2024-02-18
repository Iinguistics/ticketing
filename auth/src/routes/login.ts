import express from 'express';
import prefix from './prefix';

const router = express.Router();

router.post(`${prefix}/users/login`, (req, res) => {
	res.send('login hit')
});

export { router as loginRouter };
