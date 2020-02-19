import Sequelize from 'sequelize';

class DeliveryProblem extends Sequelize.Model {
  static init(connection) {
    super.init({
      delivery_id: Sequelize.INTEGER,
      description: Sequelize.STRING,
    },
      {
        sequelize: connection,
      });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Delivery, { foreignKey: 'delivery_id', as: 'delivery' });
  }
}

export default DeliveryProblem;