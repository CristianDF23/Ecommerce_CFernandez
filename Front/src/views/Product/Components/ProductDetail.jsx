import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/userContext'
import { handleAddToCart, sizeTwo, sizes } from '../services/product.services'
import adidas from '../../../assets/Marca/adidas.jpg'
import nike from '../../../assets/Marca/nike.jpg'
import ModalAddProduct from './ModalAddProduct'

const ProductDetail = ({ item }) => {
    const [openModal, setOpenModal] = useState(false);
    const { userInformation, setCartInformation, detailPay } = useContext(UserContext);

    return (
        <div className="pt-6">
            {
                item.brand == 'Adidas' ? <img className='w-60 mx-auto m-7' src={adidas} /> : <img className='w-60 mx-auto m-7' src={nike} />
            }
            <nav aria-label="Breadcrumb">
                <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                        <div className="flex items-center">
                            <Link to={`/api/v1/home/category/${item.category}/page/1`} id="category" className="mr-2 text-sm font-medium text-gray-900">{item.category}</Link>
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
                                        </label>))
                                            :
                                            (sizeTwo.map((size, index) => <label key={index}
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
                        {!userInformation || item.owner === userInformation.email ?
                            <></>
                            :
                            <>
                                <button onClick={() => handleAddToCart(userInformation, item, setOpenModal, setCartInformation)}
                                    className="btns">Agregar Producto
                                </button>
                                <>
                                    <ModalAddProduct setOpenModal={setOpenModal} item={item} openModal={openModal} detailPay={detailPay} />
                                </>
                            </>
                        }
                    </div>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
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