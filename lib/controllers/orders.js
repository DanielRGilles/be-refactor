const { Router } = require('express');
const Order = require('../models/Order');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const order = await Order.insert({
      id: req.body.id,
      product: req.body.product,
      quantity: req.body.quantity,
    });

    res.send(order);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.getById(id);
    res.send(order);
  })

  .get('/', async (req, res) => {
    const order = await Order.getAll();
    res.send(order);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.getById(id);
    res.send(order);
      
      const existingOrder = order.rows[0];

      if (!existingOrder) {
        const error = new Error(`Order ${id} not found`);
        error.status = 404;
        throw error;
      }

      const product = req.body.product ?? existingOrder.product;
      const quantity = req.body.quantity ?? existingOrder.quantity;
      const order = await Order.update(id, req.body.product, req.body.quantity);
      
      res.send(order);
      
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Order.deleteById(id)

    res.status(204);
    if (!rows[0]) return null;
    const order = new Order(rows[0]);
    res.send(order);
  });
