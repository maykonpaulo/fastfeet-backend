import * as Yup from 'yup';

import Deliveryman from '../models';

class DeliverymanController {
  async index(req, res) {
    const deliverymen = await Deliveryman.findAll();

    return res.json(deliverymen);
  }

  async store(req, res) {
    const validation = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await validation.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { name, email } = req.body;

    const existsEmail = await Deliveryman.findOne({
      where: { email },
    });

    if (existsEmail) {
      return res
        .status(401)
        .json({ error: 'E-mail already exists in database' });
    }

    const deliveryman = await Deliveryman.create({
      name,
      email,
    });

    return res.json(deliveryman);
  }

  async update(req, res) {
    const validation = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await validation.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const tempDeliveryman = await Deliveryman.findByPk(req.params.id);

    if (email && email !== tempDeliveryman.email) {
      const existsEmail = await Deliveryman.findOne({ where: { email } });

      if (existsEmail) {
        return res
          .status(401)
          .json({ error: 'E-mail already exists in database' });
      }
    }

    const deliveryman = await Deliveryman.update(req.body);

    return res.json(deliveryman);
  }

  async delete(req, res) {
    const validation = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await validation.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const tempDeliveryman = await Deliveryman.findByPk(req.params.id);

    if (email && email !== tempDeliveryman.email) {
      const existsEmail = await Deliveryman.findOne({ where: { email } });

      if (existsEmail) {
        return res
          .status(401)
          .json({ error: 'E-mail already exists in database' });
      }
    }

    const deliveryman = await Deliveryman.update(req.body);

    return res.json(deliveryman);
  }
}

export default new DeliverymanController();
