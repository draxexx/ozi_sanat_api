"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BranchCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BranchCourse.belongsToMany(models.user, {
        through: models.teacher_course,
        foreignKey: "branchCourseId",
        as: "teachers",
      });

      BranchCourse.belongsToMany(models.user, {
        through: models.student_payment,
        foreignKey: "branchCourseId",
        as: "students",
      });

      BranchCourse.belongsTo(models.course, {
        foreignKey: "courseId",
        as: "course",
      });

      BranchCourse.belongsTo(models.branch, {
        foreignKey: "branchId",
        as: "branch",
      });
    }
  }
  BranchCourse.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      branchId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
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
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "branch_course",
      timestamps: false,
      tableName: "branch_course",
    }
  );
  return BranchCourse;
};
