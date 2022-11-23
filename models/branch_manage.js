"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BranchManage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BranchManage.belongsTo(models.branch, {
        foreignKey: "branchId",
        as: "branch",
      });
    }
  }
  BranchManage.init(
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
      modelName: "branch_manage",
      timestamps: false,
      tableName: "branch_manage",
    }
  );
  return BranchManage;
};
