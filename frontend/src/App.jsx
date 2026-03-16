import { Link } from 'react-router';
import Navbar from "./components/Navbar";
import useInView from './hooks/useInView';
import HeroSection from './components/HeroSection';
import ServicesBar from "./components/ServicesBar";
import NewArrivals from "./components/NewArrivals";
import CategoryNavigation from "./components/CategoryNavigation";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { useStore } from "./store/store"
import { IoArrowForward } from "react-icons/io5";
import emailjs from "@emailjs/browser";
import { useRef } from 'react';

function App() {
  const { theme, lang } = useStore();
  const form = useRef();
  const { ref, inView } = useInView();

  const sendEmail = e => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_maison",
        "template_r6vxw8t",
        form.current,
        "mb32ZsgRler9xKo7U"
      )
      .then(() => {
        alert("Check your email! You've successfully subscribed to MAISON.");
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong. Please try again later.");
      });

    e.target.reset();
  }

  return (
    <>
      <div className={`${theme === 'light' ? 'bg-[#f9f7f5]' : 'bg-[#171311]'} min-h-screen transition-all duration-200`}>
        <Navbar page='home' />
        <HeroSection />
        <ServicesBar />
        <NewArrivals />
        <CategoryNavigation />

        <div className={`${theme === 'light' ? 'bg-[#1c1917]' : 'bg-[#eeebe8]'} flex justify-center items-center flex-col py-15`}>
          <span className={`text-[#988a7e]`}>{lang === 'en' ? 'LIMITED TIME' : 'შეზღუდული დროით'}</span>
          <h2 className={`${theme === 'light' ? 'text-white' : 'text-black'} font text-5xl font-medium mt-3`}>{lang === 'en' ? 'Spring Sale - Up to 30% off' : 'გაზაფხულის ფასდაკლება - 30%-მდე ფასდაკლება'}</h2>
          <p className={` text-[#988a7e] w-118.5 text-center mt-3`}>{lang === 'en' ? 'Refresh your wardrobe with our seasonal favourites. Selected styles now at reduced prices.' : 'განაახლეთ თქვენი გარდერობი ჩვენი სეზონური ფავორიტებით. შერჩეული მოდელები ახლა ფასდაკლებულ ფასებში.'}</p>
          <Link
            to={'/shop?category=all&stock=true&sort=default'} 
            className={`
              ${theme === 'light' ? 'bg-[#322f2e] border-[#6e6c69] hover:bg-[#484543] text-white' : 'bg-[#efece9] border-[#aeaba9] hover:bg-[#f0edeb] text-black'} 
              flex justify-center items-center gap-4 mt-7 rounded border py-2 px-7 cursor-pointer
            `}
            >
              {lang === 'en' ? 'SHOP THE SALE' : 'შეიძინეთ ფასდაკლებით'} <IoArrowForward size={18} />
          </Link>
        </div>

        <Testimonials />

        <div 
          ref={ref} 
          className={`
            ${inView ? 'slide-in-bottom-animation' : 'opacity-0'}
            flex justify-center items-center flex-col mt-20 pb-30
          `}
          >
            <p className="text-[#988a7e]">{lang === 'en' ? 'STAY CONNECTED' : 'დარჩით კავშირზე'}</p>
            <h2 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-4xl mt-2`}>{lang === 'en' ? 'Join the MAISON Circle' : 'შემოუერთდით MAISON-ის წრეს'}</h2>
            <p className="text-[#988a7e] text-center w-120 mt-3">{lang === 'en' ? 'Be the first to know about new collections, exclusive offers, and behind-the-scenes stories from our ateliers.' : 'პირველმა გაიგეთ ჩვენი ახალი კოლექციების შესახებ, ექსკლუზიური შეთავაზებები და კულისებს მიღმა არსებული ისტორიები.'}</p>
            <form ref={form} onSubmit={sendEmail} className="mt-7">
              <input 
                type="email"
                name='user_email'
                placeholder={lang === 'en' ? 'Enter your email' : 'შეიყვანეთ თქვენი email-ი'}
                className={`
                  ${theme === 'light' ? 'border-[#e5e0dc] text-black' : 'border-[#38312e] text-white'} 
                  border px-5 py-2 w-75 rounded focus:outline-none focus:ring-2 focus:ring-[#ce8a3e] placeholder:text-[#988a7e]
                `}
                required
                />
              <button className={`${theme === 'light' ? 'bg-[#1c1917] text-white hover:bg-[#312e2d]' : 'bg-[#eeebe8] text-black hover:bg-[#d8d5d2]'} rounded px-5 py-2 font-medium ml-3 cursor-pointer transition-all duration-200`}>{lang === 'en' ? 'Subscribe' : 'გამოიწერეთ'}</button>
            </form>
            <p className="text-xs text-[#988a7e] mt-2">{lang === 'en' ? 'No spam, unsubscribe anytime.' : 'სპამი არ არის, გამოწერის გაუქმება ნებისმიერ დროს შეგიძლიათ.'}</p>
        </div>
        <Footer />
      </div>
    </>
  )
}
export default App