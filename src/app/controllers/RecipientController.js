import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    return res.json(await Recipient.findAll());
  }

  async store(req, res) {
    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const recipient = await Recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
