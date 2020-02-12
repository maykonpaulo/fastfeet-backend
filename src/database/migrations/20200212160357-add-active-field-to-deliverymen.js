module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('deliverymen', 'active', {
      type: Sequelize.BOOLEAN,
      default: true,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliverymen', 'active');
  },
};
