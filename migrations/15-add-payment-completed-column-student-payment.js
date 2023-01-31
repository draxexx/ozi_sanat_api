"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn("student_payment", "isPaymentCompleted", {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("student_payment", "isPaymentCompleted");
  },
};
