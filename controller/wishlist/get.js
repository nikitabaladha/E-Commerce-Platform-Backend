const models = require("../../models");

async function get(req, res) {
  const { id } = req.user;

  try {
    const wishlistItems = await models.wishlists.findAll({
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

    res.json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = get;
