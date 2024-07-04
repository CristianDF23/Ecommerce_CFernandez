import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

export function Acc() {
  const { filter } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem('sort', filter.sort);
    localStorage.setItem('brand', filter.brand);
    localStorage.setItem('limit', filter.limit);
  }, [filter]);

  const clearFilters = () => {
    filter.setBrand('');
    filter.setLimit(10);
    filter.setSort('');
  };

  return (
    <div className="mt-7">
      <button onClick={clearFilters} className="text-sm leading-6 text-gray-900 p-1 py-4 hover:underline">BORRAR FILTROS</button>
      <div className="flex gap-3">
        {filter.sort === 'asc' ? (
          <div className="flex bg-slate-200 w-fit gap-2 p-1 items-center">
            <button className="font-semibold" onClick={() => filter.setSort('')}>X</button>
            <p>Menor Precio</p>
          </div>
        ) : filter.sort === 'desc' ? (
          <div className="flex bg-slate-200 w-fit gap-2 p-1 items-center">
            <button className="font-semibold" onClick={() => filter.setSort('')}>X</button>
            <p>Mayor Precio</p>
          </div>
        ) : null}
        {filter.brand && (
          <div className="flex bg-slate-200 w-fit gap-2 p-1 items-center">
            <button className="font-semibold" onClick={() => filter.setBrand('')}>X</button>
            <p>{filter.brand}</p>
          </div>
        )}
        {filter.limit === 8 ? (
          <div className="flex bg-slate-200 w-fit gap-2 p-1 items-center">
            <button className="font-semibold" onClick={() => filter.setLimit(10)}>X</button>
            <p>8 Productos</p>
          </div>
        ) : filter.limit === 6 ? (
          <div className="flex bg-slate-200 w-fit gap-2 p-1 items-center">
            <button className="font-semibold" onClick={() => filter.setLimit(10)}>X</button>
            <p>6 Productos</p>
          </div>
        ) : filter.limit === 4 ? (
          <div className="flex bg-slate-200 w-fit gap-2 p-1 items-center">
            <button className="font-semibold" onClick={() => filter.setLimit(10)}>X</button>
            <p>4 Productos</p>
          </div>
        ) : null}
      </div>
      <Accordion id="accordion" className="mt-4" collapseAll>
        <AccordionPanel>
          <AccordionTitle className="accComponent text-base font-semibold leading-6 text-gray-900 p-1 py-5">ORDENAR POR</AccordionTitle>
          <AccordionContent className="p-0">
            <button onClick={() => filter.setSort('asc')} className={`text-base leading-6 text-gray-900 p-1 py-4 ${filter.sort === 'asc' ? "border-l-4 border-black" : ''}`}>PRECIO (DE MENOR A MAYOR)</button>
            <button onClick={() => filter.setSort('desc')} className={`text-base leading-6 text-gray-900 p-1 py-4 ${filter.sort === 'desc' ? "border-l-4 border-black" : ''}`}>PRECIO (DE MAYOR A MENOR)</button>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="accComponent text-base font-semibold leading-6 text-gray-900 p-1 py-5">MARCA</AccordionTitle>
          <AccordionContent className="p-0">
            <div className="flex flex-col">
              <button onClick={() => filter.setBrand('')} className={`text-start text-base leading-6 text-gray-900 p-1 py-4 ${filter.brand === '' ? "border-l-4 border-black" : ''}`}>TODAS LAS MARCAS</button>
              <button onClick={() => filter.setBrand('Adidas')} className={`text-start text-base leading-6 text-gray-900 p-1 py-4 ${filter.brand === 'Adidas' ? "border-l-4 border-black" : ''}`}>ADIDAS</button>
              <button onClick={() => filter.setBrand('Nike')} className={`text-start text-base leading-6 text-gray-900 p-1 py-4 ${filter.brand === 'Nike' ? "border-l-4 border-black" : ''}`}>NIKE</button>
            </div>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="accComponent text-base font-semibold leading-6 text-gray-900 p-1 py-5">CANTIDAD PRODUCTOS</AccordionTitle>
          <AccordionContent className="p-0">
            <div className="flex flex-col">
              <button onClick={() => filter.setLimit(8)} className={`text-start text-base leading-6 text-gray-900 p-1 py-4 ${filter.limit === 8 ? "border-l-4 border-black" : ''}`}>8 PRODUCTOS</button>
              <button onClick={() => filter.setLimit(6)} className={`text-start text-base leading-6 text-gray-900 p-1 py-4 ${filter.limit === 6 ? "border-l-4 border-black" : ''}`}>6 PRODUCTOS</button>
              <button onClick={() => filter.setLimit(4)} className={`text-start text-base leading-6 text-gray-900 p-1 py-4 ${filter.limit === 4 ? "border-l-4 border-black" : ''}`}>4 PRODUCTOS</button>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
}
