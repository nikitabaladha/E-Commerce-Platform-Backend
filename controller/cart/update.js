const models = require("../../models");

async function updateCart(req, res) {
  const { id } = req.user;
  const { cartId, quantity } = req.body;

  try {
    const cartItem = await models.carts.findOne({
      where: {
        userId: id,
        id: cartId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    cartItem.qty = quantity;

    await cartItem.save();

    const updatedCartItems = await models.carts.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: models.products,
          attributes: [
            "productName",
            "companyName",
            "price",
            "productQuantity",
            "available",
          ],
        },
      ],
    });

    res.status(200).json(updatedCartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = updateCart;
