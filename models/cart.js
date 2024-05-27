"use strict";
const { DataTypes } = require("sequelize");
const model = require("../models");
const Product = require("./product");
const { Sequelize } = require("sequelize");

const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define("carts", {
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
    qty: {
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
  cart.setAssociation = (models) => {
    cart.belongsTo(models.products, { foreignKey: "productId" });
  };

  return cart;
};
