import express from 'express';
import { addProduct, getProducts, getProductById, changeStock } from '../controllers/productController.js';
import authSeller from '../middlewares/authSeller.js';
import { upload } from '../configs/multer.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array(['image']), authSeller, addProduct);
productRouter.get('/list', getProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/stock', authSeller, changeStock)

export default productRouter;