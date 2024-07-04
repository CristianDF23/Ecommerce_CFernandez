import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCart = async (userInformation, setProductInformation, setCartData) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/carts/${userInformation.cart}`);
        setProductInformation(response.data.products);
        setCartData(response.data)
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
    }
};

export const cartCalculations = async (productsCart) => {
    const ivaRate = 1.21;
    const iva = 0.21;
    let delivery = 'Gratis';
    let quantity = 0;
    let subTotal = 0;
    let total = 0;

    if (productsCart.length === 0) {
        quantity = 0;
    }
    
    productsCart.forEach(product => {
        quantity += product.quantity;
        subTotal += product.quantity * product.product.price;
    });

    if (subTotal < 60000) {
        delivery = 4500;
        total = Math.round((subTotal * ivaRate) + delivery);
    } else {
        total = Math.round(subTotal * ivaRate);
    }

    const taxAmount = Math.round(subTotal * iva);
    const details = {
        quantity,
        subTotal,
        taxAmount,
        total,
        delivery
    };

    localStorage.setItem("detailPay", JSON.stringify(details));
    return details;
};