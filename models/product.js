"use strict";
const { DataTypes } = require("sequelize");
const model = require("../models");

const Wishlist = require("./wishlist");
const Cart = require("./cart");
const Order = require("./orderlist");

const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define("products", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
  product.setAssociation = (models) => {
    product.hasMany(models.wishlists, { foreignKey: "productId" });
    product.hasMany(models.carts, { foreignKey: "productId" });
    product.hasOne(models.orderlists, { foreignKey: "productId" });
  };

  return product;
};
