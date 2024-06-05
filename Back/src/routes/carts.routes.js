import { Router } from 'express'
import { authorization } from '../middleware/authorization.js';
import {cartController} from '../services/factory.js'
import passport from 'passport';

const routerCarts = Router();

routerCarts.post('/', cartController.createCart);
routerCarts.post('/:cid/product/:pid', passport.authenticate('jwt', { session: false }), authorization(['Usuario', 'Premium']), cartController.addProducts);
routerCarts.get('/:cid', cartController.getCartProducts);
routerCarts.delete('/deleteCart/:cid', cartController.deleteCart);
routerCarts.delete('/:cid/product/:pid', cartController.deleteProductOfCart);
routerCarts.delete('/:cid', cartController.deleteAllProducts);
routerCarts.put('/:cid/product/:pid', cartController.updateQuantity);
routerCarts.get('/:cid/purchase', cartController.purchase)

export default routerCarts;