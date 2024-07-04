import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/userContext';
import { InfoUser } from '../User/Components/infoUser'
import { Documents } from './Components/Documents';

export const User = () => {
    const [view, setView] = useState(true);
    const { userInformation, setUserInformation } = useContext(UserContext)

    return (
        <section className="w-full ">
            <div className="ml-5 mt-5">
                <h2 className="text-2xl font-semibold uppercase">{`HOLA ${userInformation.first_name}!`}</h2>
            </div>
            <hr className="mt-4" />
            <ul className="flex mt-10 gap-5 justify-center">
                <li onClick={() => setView(true)} className="link p-5 font-semibold text-gray-800 cursor-pointer">MIS DATOS
                </li>
                <li onClick={() => setView(false)} className="link p-5 font-semibold text-gray-800 cursor-pointer">AGREGAR DOCUMENTOS
                </li>
            </ul>
            <hr />
            <section className="flex flex-col w-full mx-auto mt-10">
                {view == true ? (
                    <InfoUser user={userInformation} setUserInformation={setUserInformation} />
                ) : (
                    <Documents userInformation={userInformation} setUserInformation={setUserInformation} />
                )}
            </section>
        </section>
    )
}
