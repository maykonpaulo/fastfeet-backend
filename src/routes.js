import { Router } from 'express';
import multer from 'multer';

import authMiddleware from './app/middlewares/auth';

import {
  RecipientController,
  SessionController,
  DeliverymanController,
  DeliverymanDeliveryController,
  DeliveryController,
  DeliveryProblemsController,
  DeliveriesProblemsController,
  FileController,
} from './app/controllers';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

// ROTAS PÚBLICAS
routes.post('/sessions', SessionController.store);

routes.put(
  '/deliveryman-delivery/:delivery_id',
  DeliverymanDeliveryController.update
);

routes.get('/delivery/:delivery_id/problems', DeliveryProblemsController.store);

routes.delete(
  '/problem/:deliveryproblem_id/cancel-delivery',
  DeliveryController.delete
);

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

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get('/deliveries/problems', DeliveriesProblemsController.index);

routes.get('/delivery/:delivery_id/problems', DeliveryProblemsController.index);

export default routes;
