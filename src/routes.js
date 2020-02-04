import { Router } from 'express';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// ROTAS PÚBLICAS
routes.get('/', RecipientController.index);
routes.post('/sessions', SessionController.store);

// ROTAS PRIVADAS
routes.use(authMiddleware)

export default routes;
