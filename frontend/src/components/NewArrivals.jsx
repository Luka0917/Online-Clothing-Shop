import { useState, useEffect } from "react";
import axios from 'axios';
import useInView from "../hooks/useInView";
import { Link } from 'react-router';
import { useStore, api } from "../store/store";
import { IoArrowForward } from "react-icons/io5";

export default function NewArrivals(){
    const { theme, lang } = useStore();
    const [products, setProducts] = useState([]);
    const { ref, inView } = useInView();

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const result = await axios.get(`${api}/products`);
                setProducts(result.data.slice(0, 6));
            }catch(err){
                console.error(`Error fetching products: ${err}`);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div ref={ref} id="new-arrivals" className="flex flex-col items-center px-81 mb-30">
            <div className="flex justify-between w-full mt-30 mb-10">
                <div className={`${inView ? 'slide-in-bottom-animation' : 'opacity-0'}`} style={{ animationDelay: '0ms' }}>
                    <p className="text-sm text-[#988a7e]">{lang === 'en' ? 'C U R A T E D' : 'შ ე რ ჩ ე უ ლ ი'}</p>
                    <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-4xl`}>{lang === 'en' ? 'New Arrivals' : 'ახალი ჩამოსული'}</h3>
                </div>
                <Link 
                    to={'/shop'} 
                    className={`
                        ${inView ? 'slide-in-bottom-animation' : 'opacity-0'}
                        flex items-center text-[#988a7e] cursor-pointer hover:text-[#ce8a3e] transition-all duration-200
                    `}
                    style={{ animationDelay: '100ms' }}
                    >
                        {lang === 'en' ? 'View All' : 'ყველა ნახვა'} <IoArrowForward size={18} />
                </Link>
            </div>
            <div id="home-page-products">
                {products.map((el, i) => (
                    <Link
                        to={`/product/${el.id}`} 
                        key={el.id} 
                        className={`
                            ${inView ? 'slide-in-bottom-animation' : 'opacity-0'}
                            flex justify-center flex-col rounded cursor-pointer
                        `}
                        style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <img src={el.image} alt={el.name} className="w-88 h-110 rounded" />
                            <p className="text-sm text-[#988a7e] uppercase mt-2">{el.category}</p>
                            <p className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{el.name}</p>
                            <p className="text-[#988a7e]">${el.price}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}