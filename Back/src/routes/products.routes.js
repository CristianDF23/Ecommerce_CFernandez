import { Router } from 'express';
import { authorization } from '../middleware/authorization.js';
import { productController } from '../services/factory.js'
import passport from 'passport';
import { upload } from '../utils/multer.js';

const routerProduts = Router();

routerProduts.post('/', passport.authenticate('jwt', { session: false }), authorization(['Admin', 'Premium']), upload.array('thumbnails', 4), productController.createProduct);
routerProduts.get('/', productController.getProducts);
routerProduts.get('/:pid', productController.getProduct)
routerProduts.delete('/:pid',passport.authenticate('jwt', { session: false }), authorization(['Admin', 'Premium']), productController.deleteProduct)
routerProduts.put('/:pid', productController.updateProduct)

export default routerProduts