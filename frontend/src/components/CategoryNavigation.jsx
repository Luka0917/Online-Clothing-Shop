import { useState, useEffect } from "react";
import axios from "axios";
import useInView from "../hooks/useInView";
import { Link } from 'react-router'
import { useStore, api } from "../store/store";
import { LuCrown } from "react-icons/lu";
import { LuSparkles } from "react-icons/lu";
import { LuShirt } from "react-icons/lu";
import { HiOutlineScissors } from "react-icons/hi";
import { FiWatch } from "react-icons/fi";
import { LuFootprints } from "react-icons/lu";

export default function CategoryNavigation(){
    const { theme, lang } = useStore();
    const [counts, setCounts] = useState([]);
    const { ref, inView } = useInView();


    useEffect(() => {
        const fetchCounts = async () => {
            try{
                const res = await axios.get(`${api}/products/counts`);
                setCounts(res.data);
            }catch(err){
                console.error(`Error fetching products: ${err}`);
            }
        };
        fetchCounts();
    }, []);

    const getCount = categoryName => {
        const found = counts.find(el => el.category.toLowerCase() === categoryName.toLowerCase());
        return found ? found.count : 0;
    };

    const categories = [
        { en: 'Outwear', ka: 'გარე ტანსაცმელი', icon: <LuCrown size={30} />, count: getCount('outwear') },
        { en: 'Knitwear', ka: 'ნაქსოვი ტანსაცმელი', icon: <LuSparkles size={30} />, count: getCount('knitwear') },
        { en: 'Shirts', ka: 'მაისურები', icon: <LuShirt size={30} />, count: getCount('shirts') },
        { en: 'Bottoms', ka: 'ქვედაბოლოები', icon: <HiOutlineScissors size={30} />, count: getCount('bottoms') },
        { en: 'Accessories', ka: 'აქსესუარები', icon: <FiWatch size={30} />, count: getCount('accessories') },
        { en: 'Footwear', ka: 'ფეხსაცმელი', icon: <LuFootprints size={30} />, count: getCount('footwear') },
    ];

    return (
        <div ref={ref} className={`${theme === 'light' ? 'bg-[#f7f5f2]' : 'bg-[#1c1816]'} text-white flex justify-center items-center flex-col py-15`}>
            <p 
                className={`
                    ${inView ? 'slide-in-bottom-animation' : 'opacity-0'}
                    ${theme === 'light' ? 'text-[#1c1816]' : 'text-[#eeebe8]'} 
                    text-sm text-[#988a7e]
                `}
                >
                    {lang === 'en' ? 'C O L L E C T I O N S' : 'კ ო ლ ე ქ ც ი ე ბ ი'}
                </p> 
            <p 
                className={`
                    ${inView ? 'slide-in-bottom-animation' : 'opacity-0'}
                    ${theme === 'light' ? 'text-black' : 'text-white'} 
                    font text-4xl font-medium mt-2
                `}
                style={{ animationDelay: '50ms' }}
                >
                    {lang === 'en' ? 'Shop by Category' : 'შეიძინეთ კატეგორიის მიხედვით'}
            </p>
            <div className="flex justify-center items-center gap-5 mt-10">
                {categories.map((el, i) => (
                    <Link 
                        to={`/shop?category=${el.en.toLowerCase()}&stock=true&sort=default`}
                        key={i}
                        className={`
                            ${inView ? 'slide-in-bottom-animation' : 'opacity-0'}
                            ${theme === 'light' ? 'bg-[#fdfcfc]' : 'bg-[#221d1b] border-[#38312e]'} 
                            border flex justify-center items-center flex-col gap-1.5 w-50 py-6 rounded text-[#988a7e] cursor-pointer hover:border-[#ce8a3e] hover:text-[#ce8a3e] transition-all duration-300 hover:shadow-lg
                        `}
                        style={{ animationDelay: `${i * 100}ms` }}
                        >
                            {el.icon}
                            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font`}>{lang === 'en' ? el.en : el.ka}</p>
                            <p className="text-xs">{el.count} {lang === 'en' ? 'items' : 'პროდუქტი'}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}