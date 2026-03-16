import { useState } from "react";
import { useStore } from "../store/store"
import Navbar from "../components/Navbar"
import ForgotPassword from "../components/ForgotPassword";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function AuthPage(){
    const { theme, lang } = useStore();
    const [signIn, setSignIn] = useState(true);
    const [forgotPassword, setForgotPassword] = useState(false);

    return (
        <div className={`${theme === 'light' ? 'bg-[#f9f7f5]' : 'bg-[#171311]'} min-h-screen transition-all duration-200 flex`}>
            <Navbar />
            <div className="w-1/2 relative">
                <img src="../../src/assets/auth-bg.jpg" alt="auth-bg" className="h-screen w-full object-cover" />
                <div className={`${theme === 'light' ? 'bg-black' : 'bg-white'} opacity-35 h-screen w-full absolute top-0`}></div>
                <div className={`${theme === 'light' ? 'text-white' : 'text-black'} flex flex-col justify-between h-screen absolute top-0 pt-30 pb-10 pl-10`}>
                    <h2 className="font text-3xl font-semibold">MAISON</h2>
                    <div>
                        <h3 className="font text-2xl font-semibold mb-4">{lang === 'en' ? 'Join the MAISON community' : 'შემოუერთდით MAISON-ის საზოგადოებას'}</h3>
                        <p className={`${theme === 'light' ? 'text-[#d2ccc8]' : 'text-[#2f2722]'} flex items-center gap-2`}><IoCheckmarkOutline /> {lang === 'en' ? 'Track orders & manage returns easily' : 'შეკვეთების თვალყურის დევნება და დაბრუნების მარტივად მართვა'}</p>
                        <p className={`${theme === 'light' ? 'text-[#d2ccc8]' : 'text-[#2f2722]'} flex items-center gap-2`}><IoCheckmarkOutline /> {lang === 'en' ? 'Save your favourites to a wishlist' : 'შეინახეთ თქვენი ფავორიტები სურვილების სიაში'}</p>
                        <p className={`${theme === 'light' ? 'text-[#d2ccc8]' : 'text-[#2f2722]'} flex items-center gap-2`}><IoCheckmarkOutline /> {lang === 'en' ? 'Exclusive member-only offers' : 'ექსკლუზიური შეთავაზებები მხოლოდ წევრებისთვის'}</p>
                        <p className={`${theme === 'light' ? 'text-[#d2ccc8]' : 'text-[#2f2722]'} flex items-center gap-2`}><IoCheckmarkOutline /> {lang === 'en' ? 'Early access to new collections' : 'ახალ კოლექციებზე ადრეული წვდომა'}</p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <div className="w-110">
                    {forgotPassword ? (
                        <ForgotPassword setSignIn={setSignIn} setForgotPassword={setForgotPassword} />
                    ) : signIn ? (
                        <SignIn setSignIn={setSignIn} setForgotPassword={setForgotPassword} />
                    ) : (
                        <SignUp setSignIn={setSignIn} />
                    )}
                </div>
            </div>
        </div>
    )
}