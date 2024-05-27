const models = require("../models");

async function searchList(req, res) {
  try {
    const { userId } = req.user;
    const { query } = req.query;

    const where = { available: true };
    if (query) {
      where.name = {
        [Sequelize.Op.iLike]: `%${query}%`,
      };
    }
    const products = await models.products.findAll({
      where,
    });

    const result = products.map((product) => ({
      id: product.id,
      name: product.productName,
      company: product.companyName,
      price: product.price,
      quantity: product.productQuantity,
    }));

    res.json({ success: true, products: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = searchList;
