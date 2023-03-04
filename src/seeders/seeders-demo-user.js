'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'khactoan432@gmail.com',
      password: '123456',
      firstName: 'Toan',
      lastName: 'Khac',
      address: 'Ky tuc xa khu A lang dai hoc',
      gender: 1,
      roleId: 1,
      phoneNumber: '0987654321',
      positionId: 1,
      image: 'https://i.ibb.co/5Y3mJ33/to',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
