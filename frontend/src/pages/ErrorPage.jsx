import { useStore } from '../store/store';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LuHouse } from "react-icons/lu";
import { GoArrowLeft } from "react-icons/go";

export default function ErrorPage(){
    const { theme, lang } = useStore();
    const navigate = useNavigate();

    return (
        <div className={`${theme === 'light' ? 'bg-[#f9f7f5]' : 'bg-[#171311]'} min-h-screen transition-all duration-200`}>
            <Navbar />
            <div className='flex justify-center items-center flex-col py-70'>
                <h1 className='font text-8xl font-medium text-[#ce8a3e]'>404</h1>
                <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-2xl mt-3`}>{lang === 'en' ? 'Page Not Found' : 'გვერდი არ მოიძებნა'}</p>
                <p className='text-[#988a7e] flex gap-2 mt-2'>
                    {lang === 'en' ? "The page" : "გვერდი"}
                    <span className={`${theme === 'light' ? 'bg-[#f1f0ee]' : 'bg-[#322c29]'} flex justify-center items-center rounded text-sm px-1`}>{location.pathname}</span>
                    {lang === 'en' ? "doesn't exist or has been moved." : "არ არსებობს ან გადატანილია"}
                </p>
                <div className='flex justify-center items-center gap-5 mt-7'>
                    <button
                        onClick={() => navigate('/')}
                        className={`
                            ${theme === 'light' ? 'border-[#e5e0dc] text-black' : 'border-[#38312e] text-white'} 
                            flex justify-center items-center gap-2 bg-transparent hover:bg-[#ce8a3e] hover:text-white border px-3 py-1.5 rounded cursor-pointer transition-all duration-200
                        `}
                        >
                        <LuHouse size={20} /> {lang === 'en' ? 'Home' : 'მთავარი'}
                    </button>
                    <button
                        onClick={() => navigate('/shop?category=all&stock=true&sort=default')}
                        className={`
                            ${theme === 'light' ? 'bg-[#1c1917] text-white hover:bg-[#312e2d]' : 'bg-[#eeebe8] text-black hover:bg-[#d8d5d2]'}
                            flex justify-center items-center gap-2 px-3 py-1.5 rounded cursor-pointer transition-all duration-200
                        `}
                        >
                        <GoArrowLeft size={20} /> {lang === 'en' ? 'Shop' : 'პროდუქტები'}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
