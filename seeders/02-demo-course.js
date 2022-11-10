"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "course",
      [
        {
          title: "Satranç",
          image: "satranc.jpg",
          price: "700",
        },
        {
          title: "Piyano",
          image: "piano.jpg",
          price: "750",
        },
        {
          title: "Resim",
          image: "resim.jpg",
          price: "650",
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
