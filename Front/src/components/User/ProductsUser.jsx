import React from 'react'

export const ProductsUser = ({items}) => {
    return (
        <section className="flex flex-col w-1/2 mx-auto mt-10 h-screen">
            <h2 className="text-3xl font-semibold mb-10 text-center">MI COMPRA</h2>
            <table>
                <thead>
                    <tr><th>N°</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody className='mt-10'>
                    { items.map((item, index) =>(
                    <tr key={item.product._id} className='text-center  text-slate-500'>
                        <td className='h-12'>{index + 1}</td>
                        <td className='text-start px-6 w-96'>{item.product.brand} {item.product.title}</td>
                        <td>$ {item.product.price}</td>
                        <td>{item.quantity}</td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
        </section>
    )
}
