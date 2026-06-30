import express from 'express';
import Order from '../models/orderModel.js';
import expressAsyncHandler from'express-async-handler';
import { isAuth, isAdmin } from '../utils.js';

const orderRouter = express.Router();

// POST /api/orders - create a new order for the authenticated user
orderRouter.post('/', isAuth, expressAsyncHandler(async (req,res) => {
    const newOrder = new Order({
        // Map each cart item's _id to the "product" field expected by the schema
        orderItems: req.body.orderItems.map((x) => ({...x, product: x._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order});
}))

// GET /api/orders/mine - get all orders belonging to the authenticated user
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req,res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders)
  })
)

// GET /api/orders/:id - get a single order by id
orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

// PUT /api/orders/:id/pay - mark an order as paid
orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req,res) => {
        const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true; 
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
          };

          const updatedOrder = await order.save();
          res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found'});
    }
    })
)

// PUT /api/orders/:id/deliver - mark an order as delivered
orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Order Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

// GET /api/orders - list all orders, with the buyer's name populated (admin only)
orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  })
);
export default orderRouter;
