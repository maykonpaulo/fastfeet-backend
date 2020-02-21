import * as Yup from 'yup';
import { parseISO } from 'date-fns';

import { Delivery, Deliveryman, Recipient, DeliveryProblem } from '../models';
import Queue from '../../lib/Queue';
import { NewDelivery, CancelDelivery } from '../jobs';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll();

    return res.json(deliveries);
  }

  async store(req, res) {
    const validation = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await validation.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id: delivery_id } = await Delivery.create(req.body);

    const delivery = await Delivery.findByPk(delivery_id, {
      include: [
        { model: Recipient, as: 'recipient' },
        { model: Deliveryman, as: 'deliveryman' },
      ],
    });

    await Queue.add(NewDelivery.key, { delivery });

    return res.json(delivery);
  }

  async update(req, res) {
    const validation = Yup.object().shape({
      product: Yup.string().required(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number(),
    });

    if (!(await validation.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { start_date } = req.body;

    if (start_date) {
      const result = parseISO(start_date).getHours();

      if (!(result >= 8 && result < 18)) {
        return res
          .status(400)
          .json({ error: 'Start delivery must between 8am and 6pm' });
      }
    }

    const delivery = await Delivery.update(req.body);

    return res.json(delivery);
  }

  async delete(req, res) {
    const { id, deliveryproblem_id } = req.params;

    try {
      const delivery = id
        ? await Delivery.findByPk(id)
        : (
            await DeliveryProblem.findOne({
              where: { id: deliveryproblem_id },
              include: [{ model: Delivery, as: 'delivery' }],
            })
          ).delivery;

      delivery.canceled_at = new Date();

      await delivery.save();

      await Queue.add(CancelDelivery.key, { delivery });

      return res.json(delivery);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export default new DeliveryController();
