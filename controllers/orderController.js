import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  res.json(await Order.create({ ...req.body, user: req.user.id }));
};

export const getOrders = async (req, res) => {
  res.json(await Order.find({ user: req.user.id }));
};
