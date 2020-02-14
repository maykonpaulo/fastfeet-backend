import Sequelize from 'sequelize';

class Deliveryman extends Sequelize.Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize: connection,
        freezeTableName: true,
        tableName: 'deliverymen',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Deliveryman;
