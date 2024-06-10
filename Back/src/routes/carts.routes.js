import { Router } from 'express'
import { authorization } from '../middleware/authorization.js';
import {cartController} from '../services/factory.js'
import passport from 'passport';

const routerCarts = Router();

routerCarts.post('/', cartController.createCart);
routerCarts.post('/:cid/product/:pid', passport.authenticate('jwt', { session: false }), authorization(['Usuario', 'Premium']), cartController.addProductToCart);
routerCarts.get('/:cid', cartController.getProductsCart);
routerCarts.delete('/deleteCart/:cid', cartController.deleteCart);
routerCarts.delete('/:cid/product/:pid', cartController.deleteProductCart);
routerCarts.delete('/:cid', cartController.deleteAllProductsCart);
routerCarts.put('/:cid/product/:pid', cartController.updateQuantityOfProduct);
routerCarts.get('/:cid/purchase', cartController.completePurchase)

export default routerCarts;