"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "teacher_payment",
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          teacherId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
              model: "user",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
          },
          startDate: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          endDate: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          paymentDate: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
          },
          active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("teacher_payment");
  },
};
