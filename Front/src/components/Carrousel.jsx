import car1 from '../assets/Carrousel/car1.jpg'
import car2 from '../assets/Carrousel/car2.png'
import car3 from '../assets/Carrousel/car3.jpg'
import car4 from '../assets/Carrousel/car4.png'
import { Carousel } from "flowbite-react";

export const Carrousel = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-screen 2xl:h-96 mt-3">
            <Carousel>
                <img className='w-full h-full' src={car1} alt="..." />
                <img className='w-full h-full' src={car2} alt="..." />
                <img className='w-full h-full' src={car3} alt="..." />
                <img className='w-full h-full' src={car4} alt="..." />
            </Carousel>
        </div>
    );
}