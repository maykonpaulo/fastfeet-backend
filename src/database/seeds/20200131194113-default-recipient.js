module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Maykon Paulo',
          address_street: 'QR 210 Conjunto F Casa',
          address_number: 14,
          address_complement: 'Santa Maria',
          address_state: 'DF',
          address_city: 'Brasília',
          address_zipcode: '72510406',
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
