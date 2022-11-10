"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "branch_course",
      [
        {
          branchId: 1,
          courseId: 1,
        },
        {
          branchId: 1,
          courseId: 2,
        },
        {
          branchId: 1,
          courseId: 3,
        },
        {
          branchId: 2,
          courseId: 2,
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
