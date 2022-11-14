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
          date: new Date(),
        },
        {
          teacherCourseId: 1,
          date: new Date(),
        },
        {
          teacherCourseId: 1,
          date: new Date(),
        },
        {
          teacherCourseId: 2,
          date: new Date(),
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
