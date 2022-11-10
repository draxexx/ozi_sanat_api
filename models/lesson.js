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
      Lesson.belongsTo(models.TeacherCourse, {
        foreignKey: "teacherCourseId",
        as: "teacher_course",
      });

      Lesson.hasMany(models.LessonStudent, {
        foreignKey: "lessonId",
        as: "lessons",
      });
      Lesson.belongsToMany(models.User, {
        through: models.LessonStudent,
        foreignKey: "lessonId",
        as: "students",
      });

      Lesson.hasMany(models.Homework, {
        foreignKey: "lessonId",
        as: "lessons",
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
      date: {
        type: DataTypes.DATEONLY,
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
    }
  );
  return Lesson;
};
