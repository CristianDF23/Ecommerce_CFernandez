import React from 'react'
import { Link } from 'react-router-dom'

export const CartEmpty = () => {
    return (
        <section className="flex flex-col gap-20 mt-14 mb-40 ml-96">
            <h2 className="text-4xl font-bold">TU CARRITO ESTÁ VACÍO</h2>
            <h3 className="text-2xl">Tus Productos aparecerán acá.</h3>
            <Link to={'/api/v1/home'} className="btns">Empezar</Link>
        </section>
    )
}
