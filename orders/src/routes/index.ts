import { Router } from 'express';
import { cancelRouter } from './cancel';
import { createRouter } from './create';
import { ordersRouter } from './orders';
import { showRouter } from './show';

const routes: Router[] = [cancelRouter, createRouter, ordersRouter, showRouter];

export default routes;
