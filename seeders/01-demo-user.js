"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user",
      [
        {
          email: "ahmetyildirim@hotmail.com",
          password: "ahmet-pass",
          firstName: "Ahmet",
          lastName: "Yıldırım",
          gender: 1,
          phone: "05245246123",
          authority: 1,
        },
        {
          email: "acinar@hotmail.com",
          password: "ayse-pass",
          firstName: "Ayşe",
          lastName: "Çınar",
          gender: 2,
          phone: "05245246123",
          authority: 2,
        },
        {
          email: "mehmetyildiz@hotmail.com",
          password: "mehmet-pass",
          firstName: "Mehmet",
          lastName: "Yıldız",
          gender: 1,
          phone: "05245246123",
          authority: 3,
        },
        {
          email: "hasankara@hotmail.com",
          password: "hasan-pass",
          firstName: "Hasan",
          lastName: "Kara",
          gender: 1,
          phone: "05245246123",
          authority: 4,
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
