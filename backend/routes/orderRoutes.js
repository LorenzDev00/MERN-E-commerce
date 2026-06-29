import express from 'express';
import Order from '../models/orderModel.js';
import expressAsyncHandler from'express-async-handler';
import { isAuth, isAdmin } from '../utils.js';
// Create an instance of the Express router
const orderRouter = express.Router();

// Define a POST route for creating a new order
orderRouter.post('/', isAuth, expressAsyncHandler(async (req,res) => {
    // Create a new order object based on the request body
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({...x, product: x._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
    });

    // Save the new order to the database and send a response
    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order});
}))

// Define a GET route for retrieving the current user's orders
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req,res) => {
    // Find all orders associated with the current user and send a response
    const orders = await Order.find({ user: req.user._id });
    res.send(orders)
  })
)

// Define a GET route for retrieving a specific order by ID
orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      // Find the order with the specified ID and send a response
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

// Define a PUT route for updating an order's payment status
orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req,res) => {
        // Find the order with the specified ID
        const order = await Order.findById(req.params.id);
    if(order){
        // Update the order's payment information and save it to the database
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

// Define a PUT route for updating an order's delivery status
orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // Find the order with the specified ID
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