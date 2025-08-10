import express from 'express';
import { addProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/productController.js';
 
const router = express.Router();

router.post('/add', addProduct);
router.post('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/all', getAllProducts )
export default router;
