const models = require("../../models");

async function deleteItem(req, res) {
  const { id } = req.user;

  try {
    const { cartId } = req.params;
    
    await models.carts.destroy({
      where: {
        userId: id,
        id: cartId,
      },
    });

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

module.exports = deleteItem;
