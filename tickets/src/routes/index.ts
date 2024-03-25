import { Router } from 'express';
import { createRouter } from './create';
import { ticketsRouter } from './tickets';
import { showRouter } from './show';
import { updateRouter } from './update';

const routes: Router[] = [
	createRouter,
	ticketsRouter,
	showRouter,
	updateRouter,
];

export default routes;
