"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "lesson",
      [
        {
          teacherCourseId: 1,
          date: new Date(),
        },
        {
          teacherCourseId: 1,
          date: new Date(2022, 10, 8, 18, 33),
        },
        {
          teacherCourseId: 1,
          date: new Date(2022, 10, 15, 18, 33),
        },
        {
          teacherCourseId: 1,
          date: new Date(2022, 10, 22, 18, 33),
        },
        {
          teacherCourseId: 2,
          date: new Date(2022, 10, 29, 18, 33),
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
