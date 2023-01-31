"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StudentPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentPayment.belongsTo(models.branch_course, {
        foreignKey: "branchCourseId",
        as: "branchCourse",
      });

      StudentPayment.belongsToMany(models.lesson, {
        through: models.lesson_student,
        foreignKey: "studentPaymentId",
        as: "lessons",
      });

      StudentPayment.hasMany(models.lesson_student, {
        foreignKey: "studentPaymentId",
        as: "lessonStudents",
      });

      StudentPayment.belongsTo(models.user, {
        through: models.lesson_student,
        foreignKey: "studentId",
        as: "student",
      });
    }
  }
  StudentPayment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      studentId: {
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
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      compensationAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isPaymentCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "student_payment",
      timestamps: false,
      tableName: "student_payment",
    }
  );
  return StudentPayment;
};
