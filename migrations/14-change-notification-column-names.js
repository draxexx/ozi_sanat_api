"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.renameColumn(
        "notification",
        "studentId",
        "receiverId"
      );

      await queryInterface.renameColumn(
        "notification",
        "teacherId",
        "senderId"
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "notification",
      "receiverId",
      "studentId"
    );
    await queryInterface.renameColumn("notification", "senderId", "teacherId");
  },
};
