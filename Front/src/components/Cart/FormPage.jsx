import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { Modal } from 'flowbite-react';

export const FormPage = ({ user, item, id }) => {
    const { setTickets, userLog } = useContext(UserContext)
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        amount: item.quantityBadge,
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
            total: item.total,
            subTotal: item.subTotal,
            iva: item.ivaPrice,
            entrega: item.entrega
        }
    });

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

    const handleUpdateProduct = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/mails/newTicket`, formData, {
                headers: {
                    Authorization: `Bearer ${userLog.token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }

            );
            setOpenModal(true)
            setTimeout(() => {
                setTickets(response.data[0]);
                navigate('/purchaseCompleted')
            }, 3000)
        } catch (error) {
            console.error('Error al realizar el pago:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateProduct();
    };

    return (
        <>
            <section className="w-full py-20 px-7 overflow-y-auto mb-3">
                <h2 className="text-xl font-semibold text-slate-700 ">Información de Contacto</h2>
                <p className="mt-6 text-l mb-6">{user.email}</p>
                <hr />
                <h2 className="text-xl font-semibold text-slate-700 mt-7">DATOS DE ENVÍO</h2>
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
                    <h2 className="text-xl font-semibold text-slate-700 mt-7">Detalles de Pago</h2>
                    <div className="mt-7">
                        <div className="flex flex-col gap-2 ">
                            <input required type="text" placeholder="1234 5678 2345 7655" name="cardNumber"
                                className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                            <div className="flex gap-4 ">
                                <div className="flex flex-col gap-2 w-4/5">
                                    <input required type="text" pattern="[0-9]{2}/[0-9]{2}" placeholder="MM / YY" name="date"
                                        className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                                </div>
                                <div className="flex flex-col gap-2 w-1/5">
                                    <input required type="text" placeholder="CVC" name="code" className="block py-4 px-4 w-full h-15 text-xl text-black bg-transparent border border-gray-600 focus:border-green-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className="btns mx-auto">PAGAR $ {item.total.toLocaleString()}</button>
                </form>
                <Modal dismissible show={openModal}>
                    <div className='border rounded-none bg-white'>
                        <Modal.Body>
                                <h2 className='font-semibold text-3xl text-center text-slate-800'>ESTAMOS PROCESANDO TU PAGO</h2>
                        </Modal.Body>
                    </div>
                </Modal>
            </section>
        </>
    );
};
