const models = require("../../models");

async function deleteItem(req, res) {
  const { id } = req.user;
  const { orderlistsId, productId } = req.params;

  try {
    const orderDetail = await models.orderlists.findOne({
      where: { orderlistsId, productId },
    });

    if (!orderDetail) {
      return res.status(404).json({ error: "Product not found in the order" });
    }

    await models.orderlists.destroy({
      where: { orderlistsId, productId },
    });

    const updatedOrder = await models.orderlists.findAll({
      where: { id: orderlistsId },
      include: [
        {
          model: models.orderlists,
          attributes: ["productId", "orderQuantity"],
        },
      ],
    });

    res.status(200).json({
      message: "Product removed from the order",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = deleteItem;
// if user wants cancel any particular product from the order only
// that particular product should be deleted from the order table and
//  then order table should be updated

// if user wants to increase or decrease quantity of ordered item
// then only that particular item quantity should be increase or decrease
//  then order table should be updated

// if user gets his order successfully then delete that user from the order table
// with all his information and update order table
