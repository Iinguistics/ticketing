import { Router } from 'express';
import { createRouter } from './create';
import { showRouter } from './show';

const routes: Router[] = [createRouter, showRouter];

export default routes;
