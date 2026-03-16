import { useState, useId } from "react";
import { useStore, api } from "../store/store";
import { Link } from "react-router";
import axios from 'axios';
import { useNavigate } from "react-router";
import { GoArrowLeft } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

export default function SignUp({ setSignIn }){
    const [showPassword, setShowPassword] = useState(false);
    const { theme, lang, setUser } = useStore();
    const fullNameId = useId();
    const emailId = useId();
    const passwordId = useId();
    const checkboxId = useId();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const fullName = formData.get('fullname');
        const email = formData.get('email');
        const password = formData.get('password');


        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
        if(!passwordRegex.test(password)){
            alert('Password must be at least 8 characters with one uppercase, one number and special symbol.');
            return;
        }

        try{
            const result = await axios.post(`${api}/users/register`, { full_name: fullName, email, password });
            if(result.status === 201){
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
                    {lang === 'en' ? 'Create Account' : 'ანგარიშის შექმნა'}
            </h2>
            <p className={`${lang === 'en' ? 'text-base' : 'text-sm'} text-[#988a7e] mb-7 w-md`}>{lang === 'en' ? 'Join us and discover curated fashion for the modern wardrobe.' : 'შემოგვიერთდით და აღმოაჩინეთ თანამედროვე გარდერობისთვის შერჩეული მოდა.'}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor={fullNameId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Full Name' : 'სრული სახელი'}</label>
                <div className="flex items-center gap-3 w-110 border rounded border-[#38312e] pl-3 mt-1 mb-7">
                    <FaRegUser size={15} className="text-[#988a7e]" />
                    <input 
                        type="text" 
                        placeholder={lang === 'en' ? 'Enter your full name' : 'შეიყვანეთ თქვენი სრული სახელი'} 
                        name="fullname" 
                        autoComplete="name" 
                        id={fullNameId} 
                        className={`
                            ${lang === 'en' ? 'placeholder:text-base' : 'placeholder:text-sm'}
                            ${theme === 'light' ? 'text-black' : 'text-white'} 
                            w-full px-1 py-2 placeholder:text-[#988a7e] focus:outline-none
                        `}
                    />
                </div>

                <label htmlFor={emailId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mb-1`}>{lang === 'en' ? 'Email' : 'ელ. ფოსტა'}</label>
                <div className="flex items-center gap-3 w-110 border rounded border-[#38312e] pl-3 mt-1 mb-7">
                    <CiMail size={22} className="text-[#988a7e]" />
                    <input type="email" placeholder="you@example.com" name="email" autoComplete="email" id={emailId} className={`${theme === 'light' ? 'text-black' : 'text-white'} w-full px-1 py-2 placeholder:text-[#988a7e] focus:outline-none`} />
                </div>

                <label htmlFor={passwordId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mb-1`}>{lang === 'en' ? 'Password' : 'პაროლი'}</label>
                <div className="flex items-center gap-3 w-110 border rounded border-[#38312e] px-3 mt-1">
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
                <p className="text-[10px] text-[#988a7e] mt-0.5">{lang === 'en' ? 'Must be at least 8 characters with one uppercase, one number and special symbol.' : 'უნდა იყოს მინიმუმ 8 სიმბოლო, ერთი დიდი ასოთი, ერთი ციფრით და სპეციალური სიმბოლოთი.'}</p>
                <div className="text-[#988a7e] text-sm flex justify-center items-start gap-1 my-5">
                    <input type="checkbox" autoComplete="off" required id={checkboxId} className="accent-[#ce8a3e] min-w-4 h-4 mt-1 cursor-pointer" />
                    <label htmlFor={checkboxId} className={`${lang === 'en' ? 'text-base' : 'text-xs'}`}>{lang === 'en' ? "I agree to MAISON's Terms of Service and Privacy Policy. I consent to receiving marketing emails." : "ვეთანხმები MAISON-ის მომსახურების პირობებსა და კონფიდენციალურობის პოლიტიკას. ვეთანხმები მარკეტინგული ელფოსტის მიღებას."}</label>
                </div>
                <button className={`${theme === 'light' ? 'bg-black text-white hover:bg-[#312e2d]' : 'bg-white text-black hover:bg-[#d8d5d2]'} font-medium w-full py-2 rounded cursor-pointer transition-all duration-200`}>Create Account</button>
            </form>
            <p onClick={() => setSignIn(prev => !prev)} className="text-[#988a7e] text-center mt-7 hover:text-[#ce8a3e] cursor-pointer transition-all duration-200">{lang === 'en' ? 'Already have an account? Sign in' : 'უკვე გაქვთ ანგარიში? შედით სისტემაში'}</p>
            <div className="border-t border-[#988a7e] mt-7 flex justify-center items-center gap-7 text-[10px] text-[#988a7e] pt-5">
                <p className="flex justify-center items-center"><GoLock /> 256-bit SSL</p>
                <p>GDPR Compliant</p>
                <p>No spam, ever</p>
            </div>
        </div>
    )
}