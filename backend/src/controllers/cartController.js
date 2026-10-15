const cartModel = require('../models/cartModel');

exports.cart = async (req, res) => {
  const userId = req.user.id;
  try {
    const { id: bookId, quantity, price, cover_url, title } = req.body;
    const data = await cartModel.addToCart(userId, bookId, quantity, price, cover_url, title);
    return res.status(200).json({ message: "Successfully Added to Cart", data });
  } catch (e) {
    console.error("Controller Error (cart):", e);
    return res.status(500).json({ message: "Error While Adding books to Cart" });
  }
};

exports.cartItems = async (req, res) => {
  const userId = req.user.id;
  try {
    const itemsList = await cartModel.getCartItems(userId);
    return res.status(200).json({ data: itemsList });
  } catch (e) {
    console.error("Controller Error (cartItems):", e);
    return res.status(500).json({ message: "Error while fetching cart items" });
  }
};

exports.confirmPayment = async (req, res) => {
  const { paymentId } = req.body;
  const userId = req.user.id;
  try {
    await cartModel.deleteByUserId(userId);
    return res.status(200).json({ success: true, trackingId: paymentId });
  } catch (e) {
    console.error("Controller Error (confirmPayment):", e);
    return res.status(500).json({ message: "Error while confirming payment" });
  }
};
