module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'deliverymen',
      [
        {
          name: 'Delivery Man',
          email: 'deliveryman@fastfeet.com',
          created_at: new Date(),
          updated_at: new Date(),
          active: true,
          avatar_id: null,
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
