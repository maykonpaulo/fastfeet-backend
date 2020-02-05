import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  async store(req, res) {
    const validation = Yup.object().shape({
      name: Yup.string().required(),
      address_street: Yup.string().required(),
      address_number: Yup.number().required(),
      address_state: Yup.string().required(),
      address_city: Yup.string().required(),
      address_zipcode: Yup.number().required(),
    });

    if (!(await validation.isValid(req.body))) {
      return res.status(400).json({ error: 'Error on Validation' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const validation = Yup.object().shape({
      name: Yup.string().required(),
      address_street: Yup.string().required(),
      address_number: Yup.number().required(),
      address_state: Yup.string().required(),
      address_city: Yup.string().required(),
      address_zipcode: Yup.number().required(),
    });

    if (!(await validation.isValid(req.body))) {
      return res.status(400).json({ error: 'Error on Validation' });
    }

    const recipient = await Recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
