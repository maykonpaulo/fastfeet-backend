import * as Yup from 'yup';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Delivery, Deliveryman, Recipient } from '../models';
import Mail from '../../lib/Mail';

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
      ]
    });

    Mail.sendEmail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Nova encomenda para retirada',
      template: 'newdelivery',
      context: {
        deliveryman: delivery.deliveryman.name,
        recipient: {
          name: delivery.recipient.name,
          address_street: delivery.recipient.address_street,
          address_number: delivery.recipient.address_number,
          address_complement: delivery.recipient.address_complement,
          address_state: delivery.recipient.address_state,
          address_city: delivery.recipient.address_city,
          address_zipcode: delivery.recipient.address_zipcode,
        },
        product: delivery.product,
        date: format(
          delivery.start_date,
          "dd'/'MM'/'yyyy' às 'h:mm",
          { locale: pt, }
        ),
      }
    });

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
    const delivery = await Delivery.findByPk(req.params.id);

    delivery.canceled_at = new Date();

    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveryController();