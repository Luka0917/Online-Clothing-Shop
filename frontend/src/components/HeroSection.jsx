import { useStore } from '../store/store';
import useInView from '../hooks/useInView';
import heroImage from '../assets/hero-fashion-new.jpg';
import { IoArrowForward } from "react-icons/io5";
import { Link } from 'react-router';

export default function HeroSection(){
    const { theme, lang } = useStore();
    const { ref, inView } = useInView();

    return (
        <div
            className='relative h-screen bg-cover bg-center flex items-center'
            style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className={`${theme === 'light' ? 'from-black/40 via-black/20' : 'from-white/45 via-white/30'} absolute inset-0 bg-linear-to-r to-transparent`}></div>
                <div ref={ref} className={`${inView ? 'slide-in-bottom-animation' : 'opacity-0'} relative z-10 pl-70`}>
                    <p 
                        className={`
                            ${theme === 'light' ? 'text-[#d6cfcb]' : 'text-[#3a322c]'} 
                            slide-in-bottom-animation mb-4 transition-all duration-200
                        `} 
                        >
                            {lang === 'en' ? 'SPRING / SUMMER 2026' : 'გაზაფხული / ზაფხული 2026'}
                    </p>
                    <h1 
                        className={`
                            ${theme === 'light' ? 'text-[#f9f7f5]' : 'text-[#171311]'} 
                            slide-in-bottom-animation font text-7xl font-medium w-57 transition-all duration-200
                        `}
                        style={{ animationDelay: '100ms' }}
                        >
                            {lang === 'en' ? 'Timeless Elegance' : 'მარადიული ელეგანტურობა'}
                    </h1>
                    <p 
                        className={`
                            ${theme === 'light' ? 'text-[#d6cfcb]' : 'text-[#3a322c]'} 
                            slide-in-bottom-animation text-xl w-115.25 mt-4 mb-4 transition-all duration-200
                        `}
                        style={{ animationDelay: '200ms' }}
                        >
                            {lang === 'en' ? 'Discover our curated collection of refined essentials, crafted for the modern wardrobe.' : 'აღმოაჩინეთ ჩვენი დახვეწილი აუცილებელი ნივთების კოლექცია, რომელიც შექმნილია თანამედროვე გარდერობისთვის.'}
                    </p>
                    <Link
                        to={'/shop'}
                        className={`
                            ${theme === 'light' ? 'text-[#f9f7f5]' : 'text-[#171311]'} 
                            slide-in-bottom-animation border border-[#807266] text-sm font-medium rounded-sm flex justify-center items-center gap-4 bg-white/20 py-2.5 px-7 cursor-pointer hover:bg-white/30 transition-all duration-200 w-60
                        `}
                        style={{ animationDelay: '300ms' }}
                    >
                        {lang === 'en' ? 'EXPLORE COLLECTION' : 'ნახეთ კოლექცია'} <IoArrowForward size={18} />
                    </Link>
                </div>
        </div>
    )
}