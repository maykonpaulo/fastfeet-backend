import { Router } from 'express';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// ROTAS PÚBLICAS
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// ROTAS PRIVADAS
routes.get('/recipients', RecipientController.index);

export default routes;
