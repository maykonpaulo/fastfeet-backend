import { Sequelize, Model } from 'sequelize';
import format from '../../config/format';

class Recipient extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        address_street: Sequelize.STRING,
        address_number: Sequelize.INTEGER,
        address_complement: Sequelize.STRING,
        address_state: Sequelize.STRING,
        address_city: Sequelize.STRING,
        address_zipcode: Sequelize.STRING,
      },
      {
        sequelize: connection,
      }
    );

    this.addHook('afterFind', recipient => {
      recipient.address_zipcode = format.zipcode(delivery.recipient.address_zipcode);
    });

    return this;
  }
}

export default Recipient;
