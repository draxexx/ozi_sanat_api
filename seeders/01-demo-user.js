"use strict";

const { encryptString } = require("../helpers/crypt_string");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user",
      [
        {
          email: "karakocoguz58@gmail.com",
          password: encryptString("ozisanat"),
          firstName: "Oğuz",
          lastName: "Karakoç",
          gender: 1,
          phone: "11111111111",
          birthDate: new Date(1990, 1, 5),
          registerDate: new Date(),
          authority: 1,
        },
        {
          email: "zehrapocel@hotmail.com",
          password: encryptString("ozisanat"),
          firstName: "Zehra",
          lastName: "Polat",
          gender: 2,
          phone: "11111111111",
          birthDate: new Date(1990, 1, 5),
          registerDate: new Date(),
          authority: 1,
        },
        {
          email: "dnz.erturk2012@hotmail.com",
          password: encryptString("ozisanat"),
          firstName: "Deniz",
          lastName: "Ertürk",
          gender: 2,
          phone: "1111111111",
          birthDate: new Date(1990, 1, 5),
          registerDate: new Date(),
          authority: 2,
        },
        {
          email: "test@hotmail.com",
          password: encryptString("test123456"),
          firstName: "John",
          lastName: "Doe",
          gender: 1,
          phone: "1111111111",
          birthDate: new Date(1990, 1, 5),
          registerDate: new Date(),
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
