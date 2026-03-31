import { useState } from 'react';
import { useNavigate } from "react-router";
import { useStore, api } from '../store/store';
import axios from 'axios';
import { Link } from 'react-router'
import { GoGlobe } from "react-icons/go";
import { FiMoon } from "react-icons/fi";
import { LuSun } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";

export default function Navbar({ page }){
    const [dropdown, setDropDown] = useState(false);
    const { theme, themeToggle, lang, langToggle, user, clearUser, cart } = useStore();
    const firstName = user ? user.full_name.split(' ')[0].charAt(0).toUpperCase() + user.full_name.split(' ')[0].slice(1) : '';
    const profileCharacter = user ? user.full_name.split(' ')[0][0].toUpperCase() : '';
    const navigate = useNavigate();

    async function logout(){
        try{
            await axios.post(`${api}/users/logout`);
            clearUser();
            setDropDown(false);
            navigate('/')
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div 
            className={`
                ${theme == 'light' ? 'bg-[#f9f7f5]/80 border-[#e5e0dc]' : 'bg-[#171311]/80 border-[#38312e]'} 
                fixed top-0 left-0 w-full z-50 backdrop-blur-md flex justify-around items-center border-b p-4 transition-all duration-200`}
            >
            <Link to={'/'} className={`font ${theme === 'light' ? 'text-black' : 'text-white'} text-2xl font-semibold cursor-pointer`}>MAISON</Link>
            <nav className='flex gap-6'>
                <Link to={'/'} className={`${page === 'home' ? 'text-[#ce8a3e]' : 'text-[#827b77]'} font-medium cursor-pointer hover:text-[#ce8a3e] transition-all duration-200`}>{lang === 'en' ? 'HOME' : 'მთავარი'}</Link>
                <Link to={'/shop'} className={`${page === 'shop' ? 'text-[#ce8a3e]' : 'text-[#827b77]'} font-medium cursor-pointer hover:text-[#ce8a3e] transition-all duration-200`}>{lang === 'en' ? 'SHOP' : 'პროდუქტები'}</Link>
                <Link to={'/about'} className={`${page === 'about' ? 'text-[#ce8a3e]' : 'text-[#827b77]'} font-medium cursor-pointer hover:text-[#ce8a3e] transition-all duration-200`}>{lang === 'en' ? 'ABOUT' : 'ჩვენს შესახებ'}</Link>
                {/* <a className={`${page === 'admin' ? 'text-[#ce8a3e]' : 'text-[#827b77]'} font-medium cursor-pointer hover:text-[#ce8a3e] transition-all duration-200`}>ADMIN</a> */}
            </nav>
            <div className='flex justify-center items-center gap-5'>
                <button
                    onClick={langToggle} 
                    className={`${theme === 'light' ? 'text-black' : 'text-white'} flex justify-center items-center font-medium gap-1 cursor-pointer hover:text-[#ce8a3e] transition-all duration-200`}>
                    <span>{lang === 'en' ? 'EN' : 'KA'}</span>
                    <GoGlobe size={20} />
                </button>
                <button 
                    onClick={themeToggle} 
                    className={`${theme === 'light' ? 'text-black' : 'text-white'} cursor-pointer hover:text-[#ce8a3e] transition-all duration-200`}
                    >
                        {theme === 'light' ? <FiMoon size={20} /> : <LuSun size={20} />}
                </button>
                {user ? (
                    <div className='flex justify-center items-center gap-2'>
                        <div className='flex justify-center items-center bg-[#ce8a3e] text-white rounded-full w-8 h-8'>{profileCharacter}</div>
                        <span
                            onClick={() => setDropDown(prev => !prev)}
                            className={`
                                ${theme === 'light' ? 'text-black' : 'text-white'} 
                                text-sm font-medium cursor-pointer hover:text-[#ce8a3e] transition-all duration-200
                            `}
                        >
                            {firstName}
                        </span>

                        {dropdown && (
                            <div 
                                id="profile-dropdown"
                                className={`
                                    ${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc]' : 'bg-[#1f1b19] border-[#38312e]'} 
                                    absolute top-13 right-70 border rounded w-40 z-50`
                                }
                                >
                                    <p className="text-[#988a7e] text-xs px-4 my-2 truncate">{user.email}</p>
                                    <Link 
                                        to={'/profile'} 
                                        className={`
                                            ${theme === 'light' ? 'text-black hover:text-white' : 'text-white'} 
                                            block px-4 mx-1 py-2 text-sm font-medium rounded hover:bg-[#ce8a3e] transition-all duration-200
                                        `}
                                    >
                                        {lang === 'en' ? 'My Profile' : 'ჩემი პროფილი'}
                                    </Link>
                                    <button 
                                        onClick={logout}
                                        className={`
                                            ${theme === 'light' ? 'text-black hover:text-white' : 'text-white'}
                                            block w-37.5 text-left px-4 py-2 mx-1 mt-1 mb-2 text-sm font-medium rounded hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200
                                        `}
                                    >
                                        {lang === 'en' ? 'Sign Out' : 'გამოსვლა'}
                                    </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link 
                        to={'/auth'}
                        className={`
                            ${theme === 'light' ? 'text-black' : 'text-white'}
                            cursor-pointer hover:text-[#ce8a3e] transition-all duration-200
                        `}
                        >
                            <FiUser size={20} />
                    </Link>
                )}
                <Link 
                    to={'/cart'} 
                    className={`
                        ${theme === 'light' ? 'text-black' : 'text-white'} 
                        flex justify-center items-center gap-1 cursor-pointer hover:text-[#ce8a3e] transition-all duration-200
                    `}
                    >
                        <LuShoppingCart size={20} />
                        <span className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{cart}</span>
                </Link>
            </div>
        </div>
    )
}