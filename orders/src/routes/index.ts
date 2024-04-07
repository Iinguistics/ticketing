import { Router } from 'express';
import { createRouter } from './create';
import { ordersRouter } from './orders';
import { showRouter } from './show';

const routes: Router[] = [createRouter, ordersRouter, showRouter];

export default routes;
