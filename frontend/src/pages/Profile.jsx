import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../store/store';
import NavBar from '../components/Navbar';
import PersonalInfo from '../components/PersonalInfo';
import Orders from '../components/Orders';
import Security from '../components/Security';
import DangerZone from '../components/DangerZone';
import Footer from '../components/Footer';
import { FiUser } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";
import { GoLock } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Profile(){
    const { theme, lang, user } = useStore();
    const profileCharacter = user ? user.full_name.split(' ')[0][0].toUpperCase() : '';
    const navigate = useNavigate();
    const [sideBar, setSideBar] = useState([
        { icon: <FiUser size={20} />, textEn: 'Profile', textKa: 'პროფილი', chosen: true },
        { icon: <LuShoppingBag size={20} />, textEn: 'Orders', textKa: 'შეკვეთები', chosen: false },
        { icon: <GoLock size={20} />, textEn: 'Security', textKa: 'უსაფრთხოება', chosen: false },
        { icon: <FaRegTrashAlt size={20} />, textEn: 'Danger Zone', textKa: 'სახიფათო ზონა', chosen: false },
    ])
    const activeTab = sideBar.find(el => el.chosen).textEn;

    useEffect(() => {
        const timer = setTimeout(() => {
            if(!user) navigate('/auth');
        }, 1000);
        return () => clearTimeout(timer);
    }, [user]);

    if(!user) return null;

    return (
        <div className={`${theme === 'light' ? 'bg-[#f9f7f5]' : 'bg-[#171311]'} min-h-screen transition-all duration-200`}>
            <NavBar />
            <div className='flex justify-center flex-col px-120 py-30'>
                <div className='slide-in-left-animation flex justify-start items-center gap-4'>
                    <div className='rounded-full bg-[#ce8a3e] w-15 h-15 flex justify-center items-center text-2xl font-medium text-white'>{profileCharacter}</div>
                    <div>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-2xl font-medium`}>{user.full_name}</p>
                        <p className='text-sm text-[#988a7e]'>{user.email}</p>
                    </div>
                </div>
                <div className='flex gap-10 mt-5'>
                    <aside>
                        {sideBar.map((el, i) => (
                            <div 
                                key={i}
                                onClick={() => setSideBar(prev => prev.map(item => ({ ...item, chosen: item.textEn === el.textEn })))}
                                className={`
                                    ${el.chosen ? 'bg-[#ce8a3e] text-white' : `${theme === 'light' ? 'hover:bg-[#f5f3f1] hover:text-black' : 'hover:bg-[#241f1d] hover:text-white'}`}
                                    slide-in-bottom-animation flex justify-start items-center gap-3 w-50 rounded-md text-[#988a7e] pl-3 py-2 mt-1 cursor-pointer transition-all duration-200
                                `}
                                style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    {el.icon}
                                    <p className='font-medium'>{lang === 'en' ? el.textEn : el.textKa}</p>
                            </div>
                        ))}
                    </aside>
                    <div className='w-full text-white'>
                        {activeTab === 'Profile' && <PersonalInfo />}
                        {activeTab === 'Orders' && <Orders />}
                        {activeTab === 'Security' && <Security />}
                        {activeTab === 'Danger Zone' && <DangerZone />}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}