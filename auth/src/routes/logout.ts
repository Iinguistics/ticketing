import express from 'express';
import prefix from './prefix';

const router = express.Router();

router.post(`${prefix}/users/logout`, (req, res) => {
	req.session = null;

	res.send({});
});

export { router as logoutRouter };
