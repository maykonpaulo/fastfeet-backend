import * as Yup from 'yup';
import { File, Deliveryman } from '../models';

class FileController {
  async index(req, res) {
    const files = await File.findAll();

    return res.json(files);
  }

  async store(req, res) {
    const validation = Yup.object().shape({
      deliveryman_id: Yup.string().required(),
    });

    if (!(await validation.isValid(req.params))) {
      req.status(400).json({ error: 'Deliveryman ID is required' });
    }

    const { deliveryman_id } = req.params;
    const { originalname, filename } = req.file;

    const avatar = await File.create({
      name: originalname,
      path: filename,
    });

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    const { name, email, avatar_id } = await deliveryman.update({
      name: 'Delivery Man',
      avatar_id: avatar.id,
    });

    return res.json({
      avatar: {
        name: originalname,
        path: filename,
      },
      Deliveryman: {
        name,
        email,
        avatar_id,
      },
    });
  }
}

export default new FileController();
