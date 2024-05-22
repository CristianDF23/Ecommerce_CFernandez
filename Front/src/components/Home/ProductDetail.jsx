import React, { useContext, useState } from 'react'
import adidas from '../../assets/Marca/adidas.jpg'
import nike from '../../assets/Marca/nike.jpg'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { Modal } from 'flowbite-react'
import Swal from 'sweetalert2'

const ProductDetail = ({ item }) => {
    const [openModal, setOpenModal] = useState(false);
    const sizes = [37, 38, 39, 40, 41, 42, 43, 44]
    const sizeTwo = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];
    const { userLog, setUserCart, infoCart } = useContext(UserContext);
    let url

    const handleAddToCart = async () => {
        try {
            if (userLog) {
                url = `http://localhost:8080/api/carts/${userLog.cart}/product/${item._id}`;
            }
            const response = await axios.post(
                url, {
                pid: item._id
            },
                {
                    headers: {
                        Authorization: `Bearer ${userLog.token}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            setOpenModal(true)
            setUserCart(response.data);
        } catch (error) {
            setOpenModal(false);
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
            });
            console.log(error);
            Toast.fire({
                icon: "error",
                title: "Error al agregar el producto"
            });
        }
    };

    return (

        <div className="pt-6">
            {
                item.brand == 'Adidas' ? <img className='w-60 mx-auto m-7' src={adidas} /> : <img className='w-60 mx-auto m-7' src={nike} />
            }
            <nav aria-label="Breadcrumb">
                <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                        <div className="flex items-center">
                            <Link to={`/category/${item.category}/page/1`} id="category" className="mr-2 text-sm font-medium text-gray-900">{item.category}</Link>
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                                className="h-5 w-4 text-gray-300">
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <p className="mr-2 text-sm font-medium text-gray-900">{item.brand}</p>
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                                className="h-5 w-4 text-gray-300">
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>

                    <li className="text-sm">
                        <p aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{item.title}</p>
                    </li>
                </ol>
            </nav>

            {/* <!-- Image gallery --> */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img src={item.thumbnails.one} alt="{{title}}"
                        className="h-full w-full object-cover object-center" />
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img src={item.thumbnails.two} alt="Model wearing plain black basic tee."
                            className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img src={item.thumbnails.three} alt="Model wearing plain gray basic tee."
                            className="h-full w-full object-cover object-center" />
                    </div>
                </div>
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img src={item.thumbnails.four} alt="Model wearing plain white basic tee."
                        className="h-full w-full object-cover object-center" />
                </div>
            </div>

            {/* <!-- item info --> */}
            <div
                className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{item.title}</h1>
                </div>

                {/* <!-- Options --> */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">item information</h2>
                    <p className="text-3xl tracking-tight text-gray-900">$ {item.price.toLocaleString()}</p>

                    <div className="mt-10">
                        {/* <!-- Colors --> */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Color</h3>

                            <fieldset className="mt-4">
                                <legend className="sr-only">Choose a color</legend>
                                <div className="flex items-center space-x-3">
                                    <label
                                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                                        <input type="radio" name="color-choice" value="White" className="sr-only"
                                            aria-labelledby="color-choice-0-label" />
                                        <span id="color-choice-0-label" className="sr-only">White</span>
                                        <span aria-hidden="true"
                                            className="h-8 w-8 bg-white rounded-full border border-black border-opacity-10"></span>
                                    </label>
                                    <label
                                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                                        <input type="radio" name="color-choice" value="Gray" className="sr-only"
                                            aria-labelledby="color-choice-1-label" />
                                        <span id="color-choice-1-label" className="sr-only">Gray</span>
                                        <span aria-hidden="true"
                                            className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"></span>
                                    </label>
                                    <label
                                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
                                        <input type="radio" name="color-choice" value="Black" className="sr-only"
                                            aria-labelledby="color-choice-2-label" />
                                        <span id="color-choice-2-label" className="sr-only">Black</span>
                                        <span aria-hidden="true"
                                            className="h-8 w-8 bg-gray-900 rounded-full border border-black border-opacity-10"></span>
                                    </label>
                                </div>
                            </fieldset>
                        </div>

                        {/* <!-- Sizes --> */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-500">Size guide</a>
                            </div>

                            <fieldset className="mt-4">
                                <legend className="sr-only">Choose a size</legend>
                                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                    {
                                        item.category == "Zapatillas" || item.category == "Botines" ? (sizes.map((size, index) => <label key={index}
                                            className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                                            <input type="radio" name="size-choice" value="XXS" className="sr-only"
                                                aria-labelledby="size-choice-0-label" />
                                            <span id="size-choice-0-label">{size}</span>
                                            <span className="pointer-events-none absolute -inset-px rounded-md"
                                                aria-hidden="true"></span>
                                        </label>)) : (sizeTwo.map((size, index) => <label key={index}
                                            className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                                            <input type="radio" name="size-choice" value="XXS" className="sr-only"
                                                aria-labelledby="size-choice-0-label" />
                                            <span id="size-choice-0-label">{size}</span>
                                            <span className="pointer-events-none absolute -inset-px rounded-md"
                                                aria-hidden="true"></span>
                                        </label>))
                                    }
                                </div>
                            </fieldset>
                        </div>
                        {userLog ?
                            <>
                                <button onClick={handleAddToCart}
                                    className="btns">Agregar Producto
                                </button>
                                <Modal id='modal' dismissible show={openModal}>
                                    <div className='border rounded-none bg-white'>
                                        <header className='h-16 flex justify-between items-center'>
                                            <h2 className='text-3xl text-center w-full font-semibold text-gray-900 dark:text-white'>PRODUCTO AGREGADO AL CARRITO</h2>
                                            <button type='button' onClick={() => setOpenModal(false)} className="text-gray-400 bg-white translate-x-9 -translate-y-9 border border-black text-4xl w-14 h-14 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">X</button>
                                        </header>
                                        <Modal.Body>
                                            <section className='w-full flex'>
                                                <div className='w-1/2 px-3'>
                                                    <div className='flex'>
                                                        <img className='w-28' src={item.thumbnails.one} alt="" />
                                                        <div className='ml-3'>
                                                            <h2 className='text-slate-900 font-semibold'>{item.category.toUpperCase()} {item.brand.toUpperCase()} {item.title.toUpperCase()}</h2>
                                                            <h3 className='text-slate-900 font-semibold mt-2'>$ {item.price.toLocaleString('es-AR')}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-1/2 border-l-[1px] px-5 border-black '>
                                                    <div className='flex flex-col gap-1'>
                                                        <h2 className='text-sm'>Tu carrito</h2>
                                                        <h3>{infoCart.quantityBadge} {infoCart.quantityBadge == 1 ? 'Artículo' : 'Artículos'}</h3>
                                                        <div className='flex justify-between'>
                                                            <div className='flex flex-col gap-1'>
                                                                <h3>Precio Total:</h3>
                                                                <h3>Envío:</h3>
                                                            </div>
                                                            <div className='flex flex-col gap-1'>
                                                                <h3>$ {infoCart.total.toLocaleString('es-AR')}</h3>
                                                                <h3 className='text-end'>{infoCart.entrega}</h3>
                                                            </div>
                                                        </div>
                                                        <hr className='h-0.5 bg-black' />
                                                        <div className='flex justify-between mb-5'>
                                                            <div>
                                                                <h2 className='font-bold'>Total:</h2>
                                                                <span className='text-slate-500'>(Impuestos Incluidos)</span>
                                                            </div>
                                                            <h3 className='font-bold'>$ {infoCart.total.toLocaleString('es-AR')}</h3>
                                                        </div>
                                                        <div className='w-full'>
                                                            <button className='p-3 border text-start border-black font-semibold w-full hover:text-slate-600'><Link to={'/cart'}>VER CARRITO</Link></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </Modal.Body>
                                    </div>
                                </Modal>
                            </>
                            :
                            ''
                        }
                    </div>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    {/* <!-- Description and details --> */}
                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{item.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductDetail