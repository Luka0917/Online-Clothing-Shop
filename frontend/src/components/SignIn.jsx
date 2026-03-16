import { useState, useId } from "react";
import { useStore, api } from "../store/store";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import { GoArrowLeft } from "react-icons/go";
import { CiMail } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";


export default function SignIn({ setSignIn, setForgotPassword }){
    const [showPassword, setShowPassword] = useState(false);
    const { theme, lang, setUser } = useStore();
    const emailId = useId();
    const passwordId = useId();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try{
            const result = await axios.post(`${api}/users/login`, { email, password });
            if(result.status === 200){
                setUser(result.data.user);
                setSignIn(true);
                navigate('/');
            }
        }catch(err){
            console.error(err);
            alert(err.response?.data?.message);
        }
    }

    return (
        <div className="slide-in-left-animation flex flex-col">
            <Link to={'/'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} flex items-center gap-2 text-[#988a7e] transition-all duration-200`}><GoArrowLeft /> {lang === 'en' ? 'Back to store' : 'მაღაზიაში დაბრუნება'}</Link>
            <h2 
                className={`
                    ${lang === 'en' ? 'text-3xl' : 'text-2xl'}
                    ${theme === 'light' ? 'text-black' : 'text-white'} 
                    font mt-8
                `}
                >
                    {lang === 'en' ? 'Welcome Back' : 'კეთილი იყოს თქვენი დაბრუნება'}
            </h2>
            <p className={`${lang === 'en' ? 'text-base' : 'text-sm'} text-[#988a7e] mb-7`}>{lang === 'en' ? 'Sign in to your account to continue shopping.' : 'შედით თქვენს ანგარიშზე შოპინგის გასაგრძელებლად.'}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor={emailId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Email' : 'ელ. ფოსტა'}</label>
                <div className="flex items-center gap-3 w-110 border rounded border-[#38312e] pl-3 mt-1">
                    <CiMail size={22} className="text-[#988a7e]" />
                    <input type="email" placeholder="you@example.com" name="email" autoComplete="email" id={emailId} className={`${theme === 'light' ? 'text-black' : 'text-white'} w-full px-1 py-2 placeholder:text-[#988a7e] focus:outline-none`} />
                </div>

                <label 
                    htmlFor={passwordId} 
                    className={`
                        ${theme === 'light' ? 'text-black' : 'text-white'} 
                        flex justify-between items-center w-full mt-7 mb-1 font-medium
                    `}
                    >
                        {lang === 'en' ? 'Password' : 'პაროლი'}
                        <span 
                            onClick={() => { 
                                setSignIn(false);
                                setForgotPassword(true);
                            }} 
                            className="text-[#ce8a3e] text-xs cursor-pointer hover:underline"
                            >
                                {lang === 'en' ? 'Forgot password?' : 'დაგავიწყდათ პაროლი?'}
                        </span>
                </label>
                <div className="flex items-center gap-3 w-110 border rounded border-[#38312e] px-3">
                    <GoLock size={22} className="text-[#988a7e]" />
                    <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" name="password" autoComplete="new-password" id={passwordId} className={`${theme === 'light' ? 'text-black' : 'text-white'} w-full px-1 py-2 placeholder:text-[#988a7e] focus:outline-none`} />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="cursor-pointer"
                    >
                        {showPassword ? 
                            <LuEyeOff size={20} className="text-[#988a7e]" /> 
                            :
                            <LuEye size={20} className="text-[#988a7e]" />}
                    </button>
                </div>

                <button className={`${theme === 'light' ? 'bg-black text-white hover:bg-[#312e2d]' : 'bg-white text-black hover:bg-[#d8d5d2]'} font-medium w-full mt-5 py-2 rounded cursor-pointer transition-all duration-200`}>{lang === 'en' ? 'Sign In' : 'შესვლა'}</button>
            </form>
            <p onClick={() => setSignIn(prev => !prev)} className="text-[#988a7e] text-center mt-7 hover:text-[#ce8a3e] cursor-pointer transition-all duration-200">{lang === 'en' ? "Don't have an account? Create one" : "არ გაქვთ ანგარიში? შექმენით ის"}</p>
            <div className="border-t border-[#988a7e] mt-7 flex justify-center items-center gap-7 text-[10px] text-[#988a7e] pt-5">
                <p className="flex justify-center items-center"><GoLock /> 256-bit SSL</p>
                <p>GDPR Compliant</p>
                <p>No spam, ever</p>
            </div>
        </div>        
    )
}