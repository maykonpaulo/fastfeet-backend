import { Router } from 'express';
import multer from 'multer';

import authMiddleware from './app/middlewares/auth';

import {
  RecipientController,
  SessionController,
  DeliverymanController,
  FileController,
} from './app/controllers';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

// ROTAS PÚBLICAS
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// ROTAS PRIVADAS
routes.get('/recipients', RecipientController.index);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.get('/avatars', FileController.index);
routes.post(
  '/avatars/:deliveryman_id',
  upload.single('file'),
  FileController.store
);

export default routes;
