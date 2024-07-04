import { useState, useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IconCart3, IconUser, Prods } from '../../assets/Icons';
import logo from '../../assets/logo.png';
import { LogAndRegister, LogOut } from './Components/Session';
import { UserContext } from '../../context/userContext';

export const NavBar = () => {
    const [category, setCategory] = useState([]);
    const { userInformation, detailPay } = useContext(UserContext);

    useEffect(() => {
        const categorys = ['Zapatillas', 'Botines', 'Indumentaria'];
        setCategory(categorys);
    }, []);

    return (
        <header>
            <div className='bg-slate-900 h-10 flex justify-end'>
                <div className='flex w-3/4 justify-between items-center'>
                    <div className='ml-36'>
                        <h3 className='text-white'>Envío gratis a partir de $60.000</h3>
                    </div>
                    <div>
                        {userInformation ? <LogOut /> : <LogAndRegister />}
                    </div>
                </div>
            </div>
            <nav className='border border-b-neutral-200'>
                <div className='w-full flex justify-between p-1 px-10 items-center'>
                    <Link to='/api/v1/home' className='flex flex-col gap-2'>
                        <img src={logo} alt="Logo" className='w-10' />
                    </Link>
                    <ul className='flex gap-4'>
                        <NavLink to='/api/v1/home' className="link block py-2 px-3 text-gray-600">INICIO</NavLink>
                        {category.map((cat, index) => (
                            <NavLink to={`/api/v1/home/category/${cat}/page/1`} key={index} className="link block py-2 px-3 text-gray-600">
                                {cat.toUpperCase()}
                            </NavLink>
                        ))}
                        <NavLink to='/contact' className="link block py-2 px-3 text-gray-600">CONTACTO</NavLink>
                    </ul>
                    {userInformation ? (
                        <div className='flex gap-7'>
                            {userInformation.rol === 'Usuario' && (
                                <>
                                    <Link to='/api/v1/profile'><IconUser /></Link>
                                    <Link to='/api/v1/cart'><IconCart3 number={detailPay?.quantity || 0} /></Link>
                                </>
                            )}
                            {userInformation.rol === 'Premium' && (
                                <div className='flex gap-3'>
                                    <Link to='/api/v1/admin'><Prods /></Link>
                                    <Link to='/api/v1/profile'><IconUser /></Link>
                                    <Link to='/api/v1/cart'><IconCart3 number={detailPay?.quantity || 0} /></Link>
                                </div>
                            )}
                            {userInformation.rol !== 'Usuario' && userInformation.rol !== 'Premium' && (
                                <Link to='/api/v1/admin'><Prods /></Link>
                            )}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </nav>
        </header>
    );
};