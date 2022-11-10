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
      BranchCourse.belongsTo(models.Branch, {
        foreignKey: "branchId",
        as: "branch",
      });
      BranchCourse.belongsTo(models.Course, {
        foreignKey: "courseId",
        as: "course",
      });

      BranchCourse.hasMany(models.TeacherCourse, {
        foreignKey: "branchCourseId",
        as: "branch_courses",
      });
      BranchCourse.belongsToMany(models.User, {
        through: models.BranchCourse,
        foreignKey: "branchCourseId",
        as: "teachers",
      });

      BranchCourse.hasMany(models.StudentPayment, {
        foreignKey: "branchCourseId",
        as: "branch_courses",
      });

      BranchCourse.belongsToMany(models.User, {
        through: models.StudentPayment,
        foreignKey: "branchCourseId",
        as: "students",
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
    }
  );
  return BranchCourse;
};
