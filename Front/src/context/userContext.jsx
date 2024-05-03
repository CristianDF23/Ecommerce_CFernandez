import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const initialUserLog = JSON.parse(localStorage.getItem("userLog")) || null;

    const [userLog, setUserLog] = useState(initialUserLog);
    const [userCart, setUserCart] = useState([])
    const [cart, setCart] = useState([])
    const [cartId, setCartId] = useState(null)
    const [productsCart, setProductsCart] = useState([])
    const [productsLength, setProductsLength] = useState(null)
    const [tickets, setTickets] = useState(null)
    const [changeProd, setChangeProd] = useState(0)
    if (changeProd == 100) {
        setChangeProd(0)
    }
    useEffect(() => {
        if (userLog != null) {
            const fetchCart = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/carts/${userLog.cart}`);
                    setProductsCart(response.data.products);
                    setCartId(response.data._id)
                    setCart(response.data)
                    setProductsLength(response.data.products.length);
                } catch (error) {
                    console.error("Error fetching cart:", error);
                }
            };
            fetchCart();
        }
    }, [userLog, userCart]);

    let quantityBadge = 0
    const iva = 1.21
    let subTotal = 0

    productsCart.forEach(elem => {
        quantityBadge += elem.quantity
        subTotal += elem.quantity * elem.product.price
    })

    let entrega = 'Gratis'

    let total 
    if (subTotal < 60000) {
        entrega = 4500
        total = Math.round((subTotal * iva) + entrega)
    }else{
        total = Math.round(subTotal * iva)
    }
    
    const ivaPrice = Math.round(subTotal * 0.21).toLocaleString('es-AR')
    const infoCart = {
        quantityBadge,
        subTotal,
        total,
        entrega,
        ivaPrice
    }
    return (
        <UserContext.Provider value={{ userCart, tickets, setTickets, infoCart, userLog, setUserLog, setProductsLength, productsLength, productsCart, setUserCart, cartId, changeProd, setChangeProd }}>
            {children}
        </UserContext.Provider>
    );
}
