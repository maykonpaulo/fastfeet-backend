import { DeliveryProblem } from "../models";

class DeliveryProblemsController {
  async index(req, res) {
    const { delivery_id } = req.params;

    const problems = await DeliveryProblem.findAll({
      where: { delivery_id }
    });

    return res.json(problems);
  }

  async store(req, res) {
    const { delivery_id } = req.params;

    const { description } = req.body;

    const problem = await DeliveryProblem.create({
      delivery_id,
      description
    })

    return res.json(problem);
  }
}

export default new DeliveryProblemsController();