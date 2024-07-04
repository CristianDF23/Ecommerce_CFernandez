import * as React from "react";
import { Spinner, Tooltip } from "flowbite-react";

export const IconCart3 = ({ number }) => {
    return (
        <Tooltip content={number == 0 ? "EL CARRITO ESTÁ VACÍO" : "CARRITO"} placement="bottom" className="bg-white text-black w-fit h-10 border rounded-none text-xl font-semibold p-8 flex items-center">
            <div className=" relative inline-flex items-center text-sm font-medium text-center text-white rounded-lg">
                <svg className="w-7 h-7 text-gray-600 hover:text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"

                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M4 16V4H2V2h3a1 1 0 011 1v12h12.438l2-8H8V5h13.72a1 1 0 01.97 1.243l-2.5 10a1 1 0 01-.97.757H5a1 1 0 01-1-1zm2 7a2 2 0 110-4 2 2 0 010 4zm12 0a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
                {number === 0 ? <></> :
                    <>
                        <span className="sr-only">Notifications</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#0071ae] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{number}</div>
                    </>
                }
            </div>
        </Tooltip>
    );
}

export const IconUser = () => {
    return (
        <Tooltip content="PERFIL" placement="bottom" className="bg-white text-black w-fit h-10 border rounded-none text-xl font-semibold p-4 flex items-center">
            <svg className="w-7 h-7 text-gray-600 hover:text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
            >
                <path d="M12 2A10.13 10.13 0 002 12a10 10 0 004 7.92V20h.1a9.7 9.7 0 0011.8 0h.1v-.08A10 10 0 0022 12 10.13 10.13 0 0012 2zM8.07 18.93A3 3 0 0111 16.57h2a3 3 0 012.93 2.36 7.75 7.75 0 01-7.86 0zm9.54-1.29A5 5 0 0013 14.57h-2a5 5 0 00-4.61 3.07A8 8 0 014 12a8.1 8.1 0 018-8 8.1 8.1 0 018 8 8 8 0 01-2.39 5.64z" />
                <path d="M12 6a3.91 3.91 0 00-4 4 3.91 3.91 0 004 4 3.91 3.91 0 004-4 3.91 3.91 0 00-4-4zm0 6a1.91 1.91 0 01-2-2 1.91 1.91 0 012-2 1.91 1.91 0 012 2 1.91 1.91 0 01-2 2z" />
            </svg>
        </Tooltip>

    );
}

export const Spin = () => {
    return (
        <div className="grid min-h-full place-items-center bg-white px-6 py-24 my-24 sm:py-32 lg:px-8 text-center">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
            <p className="font-bold text-xl">Loading</p>
        </div>
    );
}

export const Prods = () => {
    return (
        <Tooltip content="ADMIN" placement="bottom" className="bg-white text-black w-fit h-10 border rounded-none text-xl font-semibold p-4 flex items-center">
            <svg className="w-7 h-7 text-gray-600 hover:text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
            >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 14v2a6 6 0 00-6 6H4a8 8 0 018-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9 6h1v5h-8v-5h1v-1a3 3 0 016 0v1zm-2 0v-1a1 1 0 00-2 0v1h2z" />
            </svg>

        </Tooltip>

    )
}

export const DeleteProd = () => {
    return (
        <svg className="w-6 h-6 hover:text-gray-400 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
        </svg>
    )
}

export const IconX = () => {
    return (
        <svg className="text-red-700"
            fill="currentColor"
            viewBox="0 0 16 16"
            height="30px"
            width="30px"
        >
            <path d="M2.146 2.854a.5.5 0 11.708-.708L8 7.293l5.146-5.147a.5.5 0 01.708.708L8.707 8l5.147 5.146a.5.5 0 01-.708.708L8 8.707l-5.146 5.147a.5.5 0 01-.708-.708L7.293 8 2.146 2.854z" />
        </svg>
    );
}

export const IconCheck2 = () => {
    return (
        <svg className="text-green-700"
            fill="currentColor"
            viewBox="0 0 16 16"
            height="30px"
            width="30px"
        >
            <path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" />
        </svg>
    );
}

export const Pencil = () => {
    return (
        <svg
            className=" text-black hover:text-gray-600"
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
        >
            <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
            <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z"
            />
        </svg>
    );
}

export const DeleteUsers = () => {
    return (
        <Tooltip content="ELIMINAR USUARIOS INACTIVOS" placement="right" className="bg-white text-black w-fit h-10 border rounded-none text-xl font-semibold p-4 flex items-center">
        <svg className="w-7 h-7 text-gray-600 hover:text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
        >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M14 14.252V22H4a8 8 0 0110-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm7 3.586l2.121-2.122 1.415 1.415L20.414 18l2.122 2.121-1.415 1.415L19 19.414l-2.121 2.122-1.415-1.415L17.586 18l-2.122-2.121 1.415-1.415L19 16.586z" />
        </svg>
        </Tooltip>

    );
}