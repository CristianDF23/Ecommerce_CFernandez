import { useState, useEffect, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { IconCart3, IconUser, Prods } from '../../assets/Icons'
import logo from '../../assets/logo.png'
import { LogAndRegister, LogOut } from './Session'
import { UserContext } from '../../context/userContext'

export const NavBar = () => {
    const [category, setCategory] = useState([])
    const [user, setUser] = useState(null)
    const { userLog, infoCart } = useContext(UserContext)

    useEffect(() => {
        const categorys = ['Zapatillas', 'Botines', 'Indumentaria']
        setCategory(categorys)
        setUser(userLog)
    }, [userLog])

    return (
        <header>
            <div className='bg-slate-900 h-10 flex justify-end'>
                <div className='flex w-3/4 justify-between items-center'>
                    <div className='ml-36'><h3 className='text-white'>Envío gratis a partir de $60.000</h3></div>
                    <div>
                        {user ?
                            <LogOut />
                            :
                            <LogAndRegister />
                        }
                    </div>
                </div>
            </div>
            <nav className='border border-b-neutral-200'>
                <div className='w-full flex justify-between p-1 px-10 items-center'>
                    <Link to='/' className='flex flex-col gap-2'>
                        <img src={logo} alt="" className='w-10' />
                    </Link>
                    <ul className='flex gap-4'>
                        <NavLink to={'/'} className="link block py-2 px-3 text-gray-600">INICIO</NavLink>
                        {category.map((cat, index) => (
                            <NavLink to={`/category/${cat}/page/1`} key={index} className="link block py-2 px-3 text-gray-600">
                                {cat.toUpperCase()}
                            </NavLink>))}
                        <NavLink to={'/contact'} className="link block py-2 px-3 text-gray-600">CONTACTO</NavLink>
                    </ul>
                    {user ?
                        <div className='flex gap-7'>
                            {
                                user.rol == 'Usuario' ?
                                    <>
                                        <Link to={'/profile'}><IconUser /></Link>
                                        <Link to={'/cart'}><IconCart3 number={infoCart.quantityBadge}/></Link>
                                    </>
                                    : user.rol == 'Premium' ? 
                                    <>
                                    <Link to={'/cart'}><IconCart3 number={infoCart.quantityBadge}/></Link>
                                    <Link to={'/admin'}><Prods /></Link>
                                    </>
                                    : <Link to={'/admin'}><Prods /></Link>
                            }
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </nav>
        </header>
    )
}
