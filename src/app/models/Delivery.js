import Sequelize from 'sequelize';

class Delivery extends Sequelize.Model {
  static init(connection) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize: connection,
      }
    );

    return this;
  }
}

export default new Delivery();
