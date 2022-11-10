"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "student_payment",
      [
        {
          studentId: 4,
          branchCourseId: 1,
          startDate: new Date(),
          endDate: new Date(),
          paymentDate: new Date(),
          price: 750,
          compensationAmount: 1,
        },
        {
          studentId: 5,
          branchCourseId: 1,
          startDate: new Date(),
          endDate: new Date(),
          paymentDate: new Date(),
          price: 750,
          compensationAmount: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
