import React from 'react';
import { NavLink } from 'react-router-dom';
import { changePage, nextPage, prevPage } from '../services/Home.services';

const Pagination = ({ category, page, arrayPages, setPage }) => {
    return (
        <div className="mx-auto flex items-center justify-around w-1/2 mt-10 float-center">
            <button onClick={() => prevPage(page, setPage)} className="px-2 py-2 text-gray-400 font-semibold hover:bg-gray-50">
                Anterior
            </button>
            <div>
                {category ?
                    arrayPages.map((pageNum, index) => (
                        <NavLink
                            key={index}
                            to={`/api/v1/home/category/${category}/page/${pageNum}`}
                            onClick={() => changePage(pageNum, setPage)}
                            className="px-4 py-2 text-m font-semibold text-gray-400 hover:bg-gray-50"
                        >
                            {pageNum}
                        </NavLink>
                    ))
                    :
                    arrayPages.map((pageNum, index) => (
                        <NavLink
                            key={index}
                            to={`/api/v1/home/page/${pageNum}`}
                            onClick={() => changePage(pageNum, setPage)}
                            className="px-4 py-2 text-m font-semibold text-gray-400 hover:bg-gray-50"
                        >
                            {pageNum}
                        </NavLink>
                    ))
                }
            </div>
            <button onClick={() => nextPage(page, setPage, arrayPages)} className="px-2 py-2 text-gray-400 font-semibold hover:bg-gray-50">
                Siguiente
            </button>
        </div>
    );
}

export default Pagination