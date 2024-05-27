const models = require("../../models");

async function create(req, res) {
  try {
    const { id } = req.user;
    const { productId } = req.body;

    const existingWishlistItem = await models.wishlists.findOne({
      where: {
        productId,
        userId:id,
      },
    });

    if (existingWishlistItem) {
      return res.json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    await models.wishlists.create({
      productId,
      userId:id,
    });

    res.json({ success: true, message: "Product added to wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = create;
