const models = require("../../models");

async function getOrder(req, res) {
  const { id } = req.user;

  try {
    const orderListItems = await models.carts.findAll({
      where: { userId: id },
      include: [
        {
          model: models.products,
          attributes: ["id", "productName", "companyName", "productQuantity"],
        },
      ],
    });

    if (!orderListItems) {
      return res.json({ message: "User has no order items." });
    }

    const totalPrice = orderListItems.reduce((sum, item) => {
      return sum + item.amount;
    }, 0);
    s;
    const orders = orderListItems.map((item) => ({
      id: item.id,
      productId: item.product.id,
      productName: item.product.productName,
      companyName: item.product.companyName,
      productQuantity: item.qty,
    }));
    res.json({ orders, totalPrice });
    res.status(200).json(orderListItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = getOrder;
