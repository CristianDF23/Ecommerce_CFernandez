import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeCode, changeDate, changeNumberCard, handleUpdateProduct } from '../services/formPage.services';
import ModalPurchase from '../../Auth/Components/ModalPurchase';

export const FormPage = ({ user, pay, id }) => {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [numberCard, setNumerCard] = useState(null)
    const [dataCard, setDataCard] = useState('')
    const [code, setCode] = useState('')
    const [formData, setFormData] = useState({
        amount: pay.quantity,
        purchaser: user.email,
        cart: id,
        shippingDetail: {
            name: '',
            phone: '',
            address: '',
            city: '',
            state: '',
        },
        detailPay: {
            total: pay.total,
            subTotal: pay.subTotal,
            iva: pay.taxAmount,
            entrega: pay.delivery
        }
    });

    const handleInputChangeDate = (e) => {
        let value = e.target.value;
        changeDate(setDataCard, value)
    };

    const handleInputChangeCodeCard = (e) => {
        let value = e.target.value;
        changeCode(setCode, value)
    };

    const handleInputChangeNumberCard = (e) => {
        let value = e.target.value;
        changeNumberCard(setNumerCard, value)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            shippingDetail: {
                ...prevFormData.shippingDetail,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateProduct(user, setOpenModal, formData, navigate);
    };

    return (
        <>
            <section className="w-full py-20 px-7 overflow-y-auto mb-3">
                <h2 className="text-xl font-semibold text-slate-700 ">INFORMACIÓN DE CONTACTO</h2>
                <p className="mt-6 text-l mb-6">{user.email}</p>
                <hr />
                <h2 className="text-xl font-semibold text-slate-700 mt-7">Detalles de Pago</h2>
                <div className="mt-7">
                    <div className="flex flex-col gap-2 ">
                        <input required type="text" placeholder="1234 5678 2345 7655" name="cardNumber" value={numberCard || ''} onChange={handleInputChangeNumberCard}
                            className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                        <div className="flex gap-4 ">
                            <div className="flex flex-col gap-2 w-4/5">
                                <input required type="text" placeholder="MM / YY" name="date" value={dataCard || ''} onChange={handleInputChangeDate}
                                    className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                            </div>
                            <div className="flex flex-col gap-2 w-1/5">
                                <input required type="text" placeholder="CVC" name="code" value={code || ''} onChange={handleInputChangeCodeCard} className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-slate-700 mt-7">Datos de Envío</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-7">
                        <div className="flex flex-col gap-2">
                            <input required type="text" placeholder="Nombre Completo" name="name" value={formData.shippingDetail.name} onChange={handleInputChange}
                                className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                            <input required type="text" placeholder="Teléfono" name="phone" value={formData.shippingDetail.phone} onChange={handleInputChange}
                                className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                        </div>
                        <hr />
                        <div className="flex flex-col gap-2 mt-2 w-full">
                            <input required type="text" placeholder="Calle" name="address" value={formData.shippingDetail.address} onChange={handleInputChange}
                                className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                            <div className="flex gap-4 w-full">
                                <div className="flex flex-col gap-2 w-2/5">
                                    <input required type="text" name="city" placeholder="Localidad" value={formData.shippingDetail.city} onChange={handleInputChange}
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                                </div>
                                <div className="flex flex-col gap-2 w-3/5">
                                    <input required type="text" placeholder="Provincia" name="state" value={formData.shippingDetail.state} onChange={handleInputChange}
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className="btns mx-auto">PAGAR $ {pay.total.toLocaleString()}</button>
                </form>
                <ModalPurchase openModal={openModal} text={'ESTAMOS PROCESANDO TU '}/>
            </section>
        </>
    );
};
