import { useId } from "react";
import { useStore } from "../store/store";
import { Link } from "react-router";
import { GoArrowLeft } from "react-icons/go";
import { CiMail } from "react-icons/ci";
import { GoLock } from "react-icons/go";

export default function ForgotPassword({ setSignIn, setForgotPassword }){
    const { theme, lang } = useStore();
    const emailId = useId();

    return (
        <div className="slide-in-left-animation flex flex-col">
            <Link to={'/'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} flex items-center gap-2 text-[#988a7e] transition-all duration-200`}><GoArrowLeft /> Back to store</Link>
            <h2 
                className={`
                    ${lang === 'en' ? 'text-3xl' : 'text-2xl'}
                    ${theme === 'light' ? 'text-black' : 'text-white'} 
                    font text-3xl mt-8
                `}
                >
                    {lang === 'en' ? 'Reset Password' : 'პაროლის აღდგენა'}
            </h2>
            <p className={`${lang === 'en' ? 'text-base' : 'text-sm'} text-[#988a7e] mb-7`}>{lang === 'en' ? "Enter your email and we'll send you a reset link." : "შეიყვანეთ თქვენი ელ. ფოსტა და ჩვენ გამოგიგზავნით გადატვირთვის ბმულს."}</p>

            <form action="">
                <label htmlFor={emailId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Email' : 'ელ. ფოსტა'}</label>
                <div className="flex items-center gap-3 w-110 border rounded border-[#38312e] pl-3 mt-1">
                    <CiMail size={22} className="text-[#988a7e]" />
                    <input type="email" placeholder="you@example.com" name="email" autoComplete="email" id={emailId} className={`${theme === 'light' ? 'text-black' : 'text-white'} w-full px-1 py-2 placeholder:text-[#988a7e] focus:outline-none`} />
                </div>

                <button className={`${theme === 'light' ? 'bg-black text-white hover:bg-[#312e2d]' : 'bg-white text-black hover:bg-[#d8d5d2]'} font-medium w-full mt-5 py-2 rounded cursor-pointer transition-all duration-200`}>{lang === 'en' ? 'Send Reset Link' : 'აღდგენის ლინკის გაგზავნა'}</button>
            </form>
            <p onClick={() => {setSignIn(prev => !prev); setForgotPassword(prev => !prev)}} className="text-[#988a7e] text-center mt-7 hover:text-[#ce8a3e] cursor-pointer transition-all duration-200">{lang === 'en' ? 'Back to Sign In' : 'დაბრუნება შესვლაზე'}</p>
            <div className="border-t border-[#988a7e] mt-7 flex justify-center items-center gap-7 text-[10px] text-[#988a7e] pt-5">
                <p className="flex justify-center items-center"><GoLock /> 256-bit SSL</p>
                <p>GDPR Compliant</p>
                <p>No spam, ever</p>
            </div>
        </div>
    )
}