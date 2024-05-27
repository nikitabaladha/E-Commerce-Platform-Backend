const models = require("../../models");

async function deleteItem(req, res) {
  const { id } = req.user;

  try {
    const { wishlistId } = req.body;

    await models.wishlists.destroy({
      where: {
        userId: id,
        id: wishlistId,
      },
    });

    console.log("destroy");

    const updatedWishlistItems = await models.wishlists.findAll({
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

    res.status(200).json(updatedWishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = deleteItem;
