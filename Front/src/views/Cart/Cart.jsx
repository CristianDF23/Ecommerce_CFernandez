import React, { useContext } from 'react';
import { CartEmpty } from '../Cart/Components/CartEmpty';
import { FormPage } from '../Cart/Components/FormPage';
import { ProductsCart } from '../Cart/Components/ProductsCart';
import { UserContext } from '../../context/userContext';

export const Cart = () => {
    const { userInformation, productsInformation, cartData, detailPay } = useContext(UserContext);

    return (
        <section>
            <div className="border border-y-gray-300 py-3 pl-4 text-xl font-semibold">
                <h2 className="uppercase">{`HOLA, ${userInformation.first_name}!`}</h2>
            </div>
            <section className="container mx-auto px-auto flex gap-6">
                {productsInformation.length === 0  ? (
                    <>
                        <CartEmpty />
                    </>
                ) : (
                    <>
                        <FormPage user={userInformation} pay={detailPay} id={cartData._id} />
                        <ProductsCart arrayProducts={productsInformation} cartData={cartData} detailPay={detailPay} />
                    </>
                )}
            </section>
        </section>
    );
};