"use strict";
const { DataTypes } = require("sequelize");
const model = require("../models");
const Product = require("./product");
const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  const wishlist = sequelize.define("wishlists", {
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  wishlist.setAssociation = (models) => {
    wishlist.belongsTo(models.products, { foreignKey: "productId" });
  };

  return wishlist;
};
