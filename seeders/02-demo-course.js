"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "course",
      [
        {
          title: "Satranç",
          image:
            "https://media.wired.com/photos/5f592bfb643fbe1f6e6807ec/191:100/w_2400,h_1256,c_limit/business_chess_1200074974.jpg",
          price: "700",
        },
        {
          title: "Piyano",
          image:
            "https://www.superprof.com.tr/blog/wp-content/uploads/2022/04/akustik-piyano-markalar-secenekler-1060x707.jpg",
          price: "750",
        },
        {
          title: "Resim",
          image:
            "https://mymodernmet.com/wp/wp-content/uploads/2018/05/painting-ideas-3-1.jpg",
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
