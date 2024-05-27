const models = require("../../models");

async function get(req, res) {
  try {
    const { id } = req.user;

    const userCart = await models.carts.findAll({
      where: { userId: id },
      include: {
        model: models.products,
        attributes: [
          "id",
          "productName",
          "companyName",
          "price",
          "productQuantity",
          "available",
        ],
      },
    });
    const totalPrice = userCart.reduce((sum, item) => {
      console.log(item);
      return sum + item.product.price * item.qty;
    }, 0);
    if (!userCart) {
      return res.json({ message: "User has no cart items." });
    }

    const carts = userCart.map((item) => ({
      id: item.id,
      productId: item.product.id,
      productName: item.product.productName,
      companyName: item.product.companyName,
      price: item.product.price,
      productQuantity: item.qty,
      available: item.product.available,
    }));
    res.json({ carts, totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = get;
