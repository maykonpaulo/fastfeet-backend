import { DeliveryProblem } from "../models";

class DeliveriesProblemsController {
  async index(req, res) {
    const deliveries = await DeliveryProblem.findAll();

    return res.json(deliveries);
  }
}

export default new DeliveriesProblemsController();