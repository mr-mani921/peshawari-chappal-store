import express from 'express';
import { addOrder, deleteOrder, deliverOrder, getAllOrders, userOrdersHistory } from '../controllers/orderController.js';
import { authenticateUser } from '../middleware/authenticate.js';
  
const router = express.Router();

// POST /api/orders/add
 router.post('/add',addOrder);
 router.get('/all', getAllOrders);
 router.post('/deliver/:id', deliverOrder);
 router.delete('/delete/:id', deleteOrder);
 router.get('/userOrdersHistory/:uid', userOrdersHistory);//pending
// GET /api/orders/userOrdersHistory/:uid
export default router;
