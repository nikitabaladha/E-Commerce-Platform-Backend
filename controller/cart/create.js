const models = require("../../models");

async function create(req, res) {
  try {
    const { id } = req.user;
    const { productId, qty = 1 } = req.body;

    const existingCartItem = await models.carts.findOne({
      where: {
        productId,
        userId: id,
      },
    });

    if (existingCartItem) {
      return res.json({
        success: false,
        message: "Product is already existing in cart ",
      });
    }

    await models.carts.create({
      productId,
      userId: id,
      qty
    });

    res.json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = create;
