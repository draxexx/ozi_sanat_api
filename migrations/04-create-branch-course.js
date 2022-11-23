"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "branch_course",
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          branchId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
              model: "branch",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
          },
          courseId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
              model: "course",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
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
    await queryInterface.dropTable("branch_course");
  },
};
