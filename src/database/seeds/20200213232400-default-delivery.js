module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'deliveries',
      [
        {
          recipient_id: 1,
          deliveryman_id: 1,
          signature_id: null,
          product: 'Produto Teste',
          canceled_at: null,
          start_date: null,
          end_date: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {
    /*
     */
  },
};
