import { Router } from 'express';
import { createRouter } from './create';
import { ordersRouter } from './orders';

const routes: Router[] = [
	createRouter,
	ordersRouter
];

export default routes;
