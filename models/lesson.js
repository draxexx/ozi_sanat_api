"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.belongsTo(models.teacher_course, {
        foreignKey: "teacherCourseId",
        as: "teacherCourse",
      });

      Lesson.belongsToMany(models.student_payment, {
        through: models.lesson_student,
        foreignKey: "lessonId",
        as: "studentPayments",
      });

      Lesson.hasMany(models.lesson_student, {
        foreignKey: "lessonId",
        as: "lessonStudents",
      });

      Lesson.hasMany(models.homework, {
        foreignKey: "lessonId",
        as: "homeworks",
      });
    }
  }
  Lesson.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      teacherCourseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "teacher_course",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "lesson",
      timestamps: false,
      tableName: "lesson",
    }
  );
  return Lesson;
};
