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
          image: "https://randomuser.me/api/portraits/men/36.jpg",
          birthDate: new Date(1995, 11, 17),
          registerDate: new Date(),
          authority: 1,
        },
        {
          email: "acinar@hotmail.com",
          password: "ayse-pass",
          firstName: "Ayşe",
          lastName: "Çınar",
          gender: 2,
          phone: "05245246123",
          image: "https://randomuser.me/api/portraits/women/57.jpg",
          birthDate: new Date(1988, 11, 17),
          registerDate: new Date(),
          authority: 2,
        },
        {
          email: "mehmetyildiz@hotmail.com",
          password: "mehmet-pass",
          firstName: "Mehmet",
          lastName: "Yıldız",
          gender: 1,
          phone: "05245246123",
          image: "https://randomuser.me/api/portraits/men/68.jpg",
          birthDate: new Date(1980, 11, 17),
          registerDate: new Date(),
          authority: 3,
        },
        {
          email: "hasankara@hotmail.com",
          password: "hasan-pass",
          firstName: "Hasan",
          lastName: "Kara",
          gender: 1,
          phone: "05245246123",
          image: "https://randomuser.me/api/portraits/men/42.jpg",
          birthDate: new Date(2011, 11, 17),
          registerDate: new Date(),
          authority: 4,
        },
        {
          email: "merveoymak@hotmail.com",
          password: "hasan-pass",
          firstName: "Merve",
          lastName: "Oymak",
          gender: 2,
          phone: "05245246123",
          image: "https://randomuser.me/api/portraits/women/19.jpg",
          birthDate: new Date(2015, 11, 17),
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
