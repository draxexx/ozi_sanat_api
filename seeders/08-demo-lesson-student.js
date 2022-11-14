"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "lesson_student",
      [
        {
          lessonId: 1,
          studentPaymentId: 1,
          status: 0,
        },
        {
          lessonId: 2,
          studentPaymentId: 1,
          status: 1,
        },
        {
          lessonId: 3,
          studentPaymentId: 1,
          status: 2,
        },
        {
          lessonId: 4,
          studentPaymentId: 1,
          status: 0,
        },
        {
          lessonId: 1,
          studentPaymentId: 2,
          status: 0,
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
