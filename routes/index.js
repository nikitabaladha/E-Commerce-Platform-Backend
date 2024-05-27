const Controller = require("../controller");
const Middleware = require("../middleware");
module.exports = (app) => {
  app.post("/api/signup", Controller.signup);
  app.post("/api/login", Controller.login);
  app.get("/api/product-list", Middleware, Controller.searchList);

  app.post("/api/wish-list", Middleware, Controller.wishList.create);
  app.get("/api/wish-list", Middleware, Controller.wishList.get);
  app.put("/api/wish-list", Middleware, Controller.wishList.deleteItem);

  app.post("/api/cart", Middleware, Controller.cart.create);
  app.get("/api/cart", Middleware, Controller.cart.get);
  app.delete("/api/cart/:cartId", Middleware, Controller.cart.deleteItem);
  app.put("/api/cart", Middleware, Controller.cart.updateCart);

  app.post("/api/order", Middleware, Controller.order.create);
  app.get("/api/order", Middleware, Controller.order.get);
  // app.put("/api/order", Middleware, Controller.cart.updateOrder);
  app.delete(
    "/api/order/:orderlistsId",
    Middleware,
    Controller.order.deleteItem
  );
};
