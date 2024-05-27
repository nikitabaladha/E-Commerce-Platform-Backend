"use strict";
const { DataTypes } = require("sequelize");
const model = require("../models");

const Product = require("./product");
const { Sequelize } = require("sequelize");

const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  const orderlist = sequelize.define("orderlists", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  orderlist.setAssociation = (models) => {
    orderlist.belongsTo(models.products, { foreignKey: "productId" });
  };

  return orderlist;
};
