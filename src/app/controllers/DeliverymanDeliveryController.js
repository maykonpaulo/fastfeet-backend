import { Delivery } from '../models';

class DeliverymanDeliveryController {
  async update(req, res) {
    const { delivery_id } = req.params;

    const delivery = Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    delivery.end_date = new Date();

    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliverymanDeliveryController();
