import { Router } from 'express';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.get('/', RecipientController.index);

export default routes;
