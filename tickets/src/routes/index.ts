import { Router } from 'express';
import { createRouter } from './create';
import { ticketsRouter } from './tickets';
import { showRouter } from './show';

const routes: Router[] = [createRouter, ticketsRouter, showRouter];

export default routes;
