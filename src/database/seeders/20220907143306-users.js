module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        full_name: 'Leonardo',
        email: 'leo@test.com',
        phone_num: '11942079043',
      },
      {
        full_name: 'Eduardo',
        email: 'edu@test.com',
        phone_num: '11942079043',
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
