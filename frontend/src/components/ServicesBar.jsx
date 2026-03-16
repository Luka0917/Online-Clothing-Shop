import { useStore } from "../store/store";
import useInView from "../hooks/useInView";
import { LuTruck } from "react-icons/lu";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { LuShield } from "react-icons/lu";
import { TbHeadphones } from "react-icons/tb";

export default function ServicesBar(){
  const { theme, lang } = useStore();
  const { ref, inView } = useInView();

    return(
        <div ref={ref} className={`${theme === 'light' ? 'bg-[#f7f5f2] border-[#e5e0dc]' : 'bg-[#1c1816] border-[#38312e]'} flex justify-center items-center gap-50 border-b py-15 transition-all duration-200`}>
            <div className={`${inView ? 'slide-in-bottom-animation' : 'opacity-0'} flex flex-col items-center gap-1`}>
                <LuTruck size={25} className="text-[#ce8a3e]" />
                <p className={`${theme === 'light' ? 'text-[#1c1816]' : 'text-[#eeebe8]'} font font-semibold`}>{lang === 'en' ? 'Free Shipping' : 'უფასო მიწოდება'}</p>
                <p className="text-sm text-[#988a7e] text-center w-50">{lang === 'en' ? 'On orders over $300' : '300$-ზე მეტი ღირებულების შეკვეთაზე'}</p>
            </div>
            <div className={`${inView ? 'slide-in-bottom-animation' : 'opacity-0'} flex flex-col items-center gap-1`} style={{ animationDelay: '150ms' }}>
                <FaArrowRotateLeft size={25} className="text-[#ce8a3e]" />
                <p className={`${theme === 'light' ? 'text-[#1c1816]' : 'text-[#eeebe8]'} font font-semibold`}>{lang === 'en' ? 'Easy Returns' : 'მარტივი დაბრუნება'}</p>
                <p className="text-sm text-[#988a7e] text-center w-45">{lang === 'en' ? '30-day return policy' : '30-დღიანი დაბრუნების პოლიტიკა'}</p>
            </div>
            <div className={`${inView ? 'slide-in-bottom-animation' : 'opacity-0'} flex flex-col items-center gap-1`} style={{ animationDelay: '300ms' }}>
                <LuShield size={25} className="text-[#ce8a3e]" />
                <p className={`${theme === 'light' ? 'text-[#1c1816]' : 'text-[#eeebe8]'} font font-semibold`}>{lang === 'en' ? 'Secure Payment' : 'უსაფრთხო გადახდა'}</p>
                <p className="text-sm text-[#988a7e]">256-bit SSL {lang === 'en' ? 'encryption' : 'დაშიფვრა'}</p>
            </div>
            <div className={`${inView ? 'slide-in-bottom-animation' : 'opacity-0'} flex flex-col items-center gap-1`} style={{ animationDelay: '450ms' }}>
                <TbHeadphones size={25} className="text-[#ce8a3e]" />
                <p className={`${theme === 'light' ? 'text-[#1c1816]' : 'text-[#eeebe8]'} font font-semibold`}>24/7 {lang === 'en' ? 'Support' : 'მხარდაჭერა'}</p>
                <p className="text-sm text-[#988a7e] text-center w-45">{lang === 'en' ? 'Always here to help' : 'ყოველთვის აქ ვართ დასახმარებლად'}</p>
            </div>
        </div>
    )
}