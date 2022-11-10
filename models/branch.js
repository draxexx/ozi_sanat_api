"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Branch.hasMany(models.BranchCourse, {
        foreignKey: "branchId",
        as: "branches",
      });
      Branch.belongsToMany(models.Course, {
        through: models.BranchCourse,
        foreignKey: "branchId",
        as: "courses",
      });
    }
  }
  Branch.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "branch",
    }
  );
  return Branch;
};
