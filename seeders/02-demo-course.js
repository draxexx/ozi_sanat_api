"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "course",
      [
        {
          title: "Satranç ve Akıl Oyunları",
          image: "http://ozisanat.draxex.com/course-images/satran%C3%A7.webp",
          price: "700",
          registerDate: new Date(),
        },
        {
          title: "Piyano",
          image: "http://ozisanat.draxex.com/course-images/piyano.jpg",
          price: "750",
          registerDate: new Date(),
        },
        {
          title: "Resim",
          image: "http://ozisanat.draxex.com/course-images/resim.jpg",
          price: "650",
          registerDate: new Date(),
        },
        {
          title: "Gitar",
          image: "http://ozisanat.draxex.com/course-images/gitar.jpg",
          price: "650",
          registerDate: new Date(),
        },
        {
          title: "Keman",
          image: "http://ozisanat.draxex.com/course-images/keman.webp",
          price: "650",
          registerDate: new Date(),
        },
        {
          title: "Bateri",
          image: "http://ozisanat.draxex.com/course-images/bateri.jpg",
          price: "650",
          registerDate: new Date(),
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
