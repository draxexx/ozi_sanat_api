"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "notification",
      [
        {
          studentId: 4,
          teacherId: 3,
          message: "Bugünkü satranç dersi iptal",
          image: "",
          date: new Date(),
        },
        {
          studentId: 4,
          teacherId: 3,
          message: "Bugünkü piyano dersi iptal",
          image: "",
          date: new Date(),
        },
        {
          studentId: 4,
          teacherId: 3,
          message: "Lütfen ödeme yapınız",
          image: "",
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
