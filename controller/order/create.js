const models = require("../../models");

function generateOrderNumber() {
  const prefix = "ORDER";
  const timestamp = Date.now();
  return `${prefix}-${timestamp}`;
}

async function createOrder(req, res) {
  const { id: userId } = req.user;
  try {
    const orderNumber = generateOrderNumber();
    const cartItems = await models.carts.findAll({
      where: { userId },
      include: {
        model: models.products,
        attributes: ["price"],
      },
    });
    if (!cartItems && !cartItems.length) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    for (const cartItem of cartItems) {
      const productPrice = cartItem.product.price;

      await models.orderlists.create({
        productId: cartItem.productId,
        userId,
        orderNumber,
        amount: productPrice,
        orderQuantity: cartItem.qty,
      });
    }
    console.log(typeof orderNumber);
    await models.carts.destroy({
      where: { userId },
    });

    res.status(200).json({ message: "Item moved to Order successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = createOrder;
