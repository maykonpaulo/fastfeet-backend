import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Mail from '../../lib/Mail';

class CancelDelivery {
  get key() {
    return 'CancelDelivery';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendEmail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Encomenda cancelada',
      template: 'canceldelivery',
      context: {
        deliveryman: delivery.deliveryman.name,
        recipient: {
          name: delivery.recipient.name,
          address_street: delivery.recipient.address_street,
          address_number: delivery.recipient.address_number,
          address_complement: delivery.recipient.address_complement,
          address_state: delivery.recipient.address_state,
          address_city: delivery.recipient.address_city,
          address_zipcode: delivery.recipient.address_zipcode,
        },
        product: delivery.product,
        date: format(delivery.start_date, "dd'/'MM'/'yyyy' às 'h:mm", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancelDelivery();
