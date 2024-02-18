import express from 'express';
import prefix from './prefix';

const router = express.Router();

router.post(`${prefix}/users/logout`, (req, res) => {
	res.send('logout hit')
});

export { router as logoutRouter };
