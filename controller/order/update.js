const models = require("../../models");

async function updateOrder(req, res) {
  const { orderlistId, productId, action, quantity } = req.body;
  try {
    const orderDetail = await models.orderlists.findOne({
      where: { orderlistId, productId },
    });

    if (!orderDetail) {
      return res.status(404).json({ error: "Product not found in the order" });
    }

    if (action === "increase") {
      await models.orderlists.increment("orderQuantity", {
        by: quantity,
        where: { orderlistsId, productId },
      });
    } else if (action === "decrease") {
      await models.orderlists.decrement("orderQuantity", {
        by: quantity,
        where: { orderlistsId, productId },
      });
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    const updatedOrder = await models.orderlists.findAll({
      where: { id: orderId },
      include: [
        {
          model: models.orderlists,
          attributes: ["productId", "orderQuantity"],
        },
      ],
    });
    res
      .status(200)
      .json({ message: "Quantity updated successfully", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = updateOrder;
