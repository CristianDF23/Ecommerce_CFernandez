import { createContext, useEffect, useState } from "react";
import { getCart, cartCalculations } from "../services/context.services";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const initialUserInformation = JSON.parse(localStorage.getItem("userInformation")) || null;
    const [userInformation, setUserInformation] = useState(initialUserInformation);
    const [cartData, setCartData] = useState([])
    const [cartInformation, setCartInformation] = useState(1);
    const [productsInformation, setProductInformation] = useState([]);
    const [detailPay, setDetailPay] = useState(null);
    const [sort, setSort] = useState(null);
    const [limit, setLimit] = useState(10);
    const [brand, setBrand] = useState(null);

    useEffect(() => {
        const getData = async () => {
            if (userInformation) {
                await getCart(userInformation, setProductInformation, setCartData);
            }
        };
        getData();
    }, [userInformation, cartInformation]);

    useEffect(() => {
        const calculateDetails = async () => {
            const calculations = await cartCalculations(productsInformation);
            setDetailPay(calculations);
        };
        calculateDetails();
    }, [productsInformation, cartInformation]);


    const filter = {
        sort,
        setSort,
        brand,
        setBrand,
        limit,
        setLimit
    }

    return (
        <UserContext.Provider value={{ filter, userInformation, setUserInformation, setCartInformation, cartInformation, detailPay, cartData, productsInformation, setProductInformation, setCartData }}>
            {children}
        </UserContext.Provider>
    );
};
