import Sequelize from 'sequelize';
import format from '../../config/format';

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
        freezeTableName: true,
        tableName: 'deliveries',
      }
    );

    this.addHook('afterFind', delivery => {
      delivery.recipient && (delivery.recipient.address_zipcode = format.zipcode(delivery.recipient.address_zipcode));
    })

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id', as: 'recipient' });
    this.belongsTo(models.Deliveryman, { foreignKey: 'deliveryman_id', as: 'deliveryman' });
    this.belongsTo(models.File, { foreignKey: 'signature_id', as: 'signature' });
  }
}

export default Delivery;
