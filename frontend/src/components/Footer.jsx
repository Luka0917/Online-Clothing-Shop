import { Link } from "react-router";
import { useStore } from "../store/store" 

export default function Footer(){
    const { theme, lang } = useStore();

    return (
        <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} w-full flex justify-center items-center flex-col border-t py-10 text-white`}>
            <div className="flex justify-between items-start w-full px-75">
                <div>
                    <h5 className={`${theme === 'light' ? 'text-black' : 'text-white'} font font-semibold`}>MAISON</h5>
                    <p className="text-xs text-[#988a7e] mt-3">{lang === 'en' ? 'Curated fashion for the modern individual.' : 'თანამედროვე ინდივიდისთვის შერჩეული მოდა.'}</p>
                </div>
                <div className="flex justify-center flex-col gap-2">
                    <b className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xs mb-1`}>{lang === 'en' ? 'SHOP' : 'პროდუქტები'}</b>
                    <Link to={'/'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} text-xs text-[#988a7e] transition-all duration-200`}>{lang === 'en' ? 'New Arrivals' : 'ახალი ჩამოსული'}</Link>
                    <Link to={'/shop?category=outwear&stock=true&sort=default'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} text-xs text-[#988a7e] transition-all duration-200`}>{lang === 'en' ? 'Outwear' : 'გარე ტანსაცმელი'}</Link>
                    <Link to={'/shop?category=knitwear&stock=true&sort=default'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} text-xs text-[#988a7e] transition-all duration-200`}>{lang === 'en' ? 'Knitwear' : 'ნაქსოვი ტანსაცმელი'}</Link>
                    <Link to={'/shop?category=accessories&stock=true&sort=default'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} text-xs text-[#988a7e] transition-all duration-200`}>{lang === 'en' ? 'Accessories' : 'აქსესუარები'}</Link>
                </div>
                <div className="flex justify-center flex-col gap-2">
                    <b className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xs mb-1`}>{lang === 'en' ? 'COMPANY' : 'კომპანია'}</b>
                    <Link to={'/about'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} text-xs text-[#988a7e] transition-all duration-200`}>{lang === 'en' ? 'About' : 'ჩვენს შესახებ'}</Link>
                    <Link to={'/about'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} text-xs text-[#988a7e] transition-all duration-200`}>{lang === 'en' ? 'Careers' : 'კარიერა'}</Link>
                    <Link to={'/about'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} text-xs text-[#988a7e] transition-all duration-200`}>{lang === 'en' ? 'Sustainability' : 'მდგრადობა'}</Link>
                </div>
                <div className="flex justify-center flex-col gap-2">
                    <b className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xs mb-1`}>{lang === 'en' ? 'HELP' : 'დახმარება'}</b>
                    <Link to={'/'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} text-xs text-[#988a7e] transition-all duration-200`}>{lang === 'en' ? 'Contact' : 'კონტაქტი'}</Link>
                    <Link to={'/'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} text-xs text-[#988a7e] transition-all duration-200`}>{lang === 'en' ? 'Shiping' : 'მიწოდება'}</Link>
                    <Link to={'/'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} text-xs text-[#988a7e] transition-all duration-200`}>{lang === 'en' ? 'Returns' : 'დაბრუნება'}</Link>
                </div>
            </div>
            <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} flex justify-between items-center w-325 mt-7 border-t pt-3`}>
                <span className="text-xs text-[#988a7e]">© 2026 MAISON. {lang === 'en' ? 'All rights reserved.' : 'ყველა უფლება დაცულია.'}</span>
                <span className="text-xs text-[#988a7e]">₾(U)k4</span>
            </div>
        </div>
    )
}