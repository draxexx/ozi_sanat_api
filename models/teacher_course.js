"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TeacherCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TeacherCourse.belongsTo(models.branch_course, {
        foreignKey: "branchCourseId",
        as: "branch_course",
      });
      TeacherCourse.belongsTo(models.user, {
        foreignKey: "teacherId",
        as: "teacher",
      });

      TeacherCourse.hasMany(models.lesson, {
        foreignKey: "teacherCourseId",
        as: "teacher_course",
      });
    }
  }
  TeacherCourse.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      branchCourseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "branch_course",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      teacherId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "user",
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
      modelName: "teacher_course",
    }
  );
  return TeacherCourse;
};
