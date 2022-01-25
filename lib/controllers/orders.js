const { Router } = require('express');
const Order = require('../models/Order');


module.exports = Router()
  .post('/', async (req, res) => {
    const order = await Order.insert(req.body);
    res.json(order);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.getById(id);
    res.json(order);
  })

  .get('/', async (req, res) => {
    const order = await Order.getAll();
    res.json(order);
  })

  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { product, quantity } = req.body;
   
    try {
      const order = await Order.updateById(id, { product, quantity });
      res.json(order);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const order = await Order.deleteById(req.params.id);
      res.json(order);
    } catch(err) {
      res(err);
    }
  });

  
