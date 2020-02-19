import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import { Delivery, DeliveryProblem, Deliveryman, User, Recipient, File } from '../app/models';

const models = [Delivery, DeliveryProblem, Deliveryman, User, Recipient, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
