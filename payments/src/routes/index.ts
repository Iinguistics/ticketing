import { Router } from 'express';
import { createRouter } from './create';

const routes: Router[] = [createRouter];

export default routes;
