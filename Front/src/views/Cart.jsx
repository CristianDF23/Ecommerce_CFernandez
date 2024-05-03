import React, { useContext } from 'react';
import { CartEmpty } from '../components/Cart/CartEmpty';
import { FormPage } from '../components/Cart/FormPage';
import { ProductsCart } from '../components/Cart/ProductsCart';
import { UserContext } from '../context/userContext';

export const Cart = () => {
    const { userLog, productsLength, productsCart, infoCart, cartId } = useContext(UserContext);

    return (
        <section>
            <div className="border border-y-gray-300 py-3 pl-4 text-xl font-semibold">
                <h2 className="uppercase">{`HOLA, ${userLog.first_name}!`}</h2>
            </div>
            <section className="container mx-auto px-auto flex gap-6">
                {productsLength == 0  ? (
                    <>
                        <CartEmpty />
                    </>
                ) : (
                    <>
                        <FormPage user={userLog} item={infoCart} id={cartId} />
                        <ProductsCart arrayProducts={productsCart} />
                    </>
                )}
            </section>
        </section>
    );
};