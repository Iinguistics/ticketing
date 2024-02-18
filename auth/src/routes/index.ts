import { Router } from 'express';
import { currentRouter } from './current';
import { loginRouter } from './login';
import { logoutRouter } from './logout';
import { registerRouter } from './register';

const routes: Router[] = [currentRouter, loginRouter, logoutRouter, registerRouter];

export default routes;
