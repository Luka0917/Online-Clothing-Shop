import { useStore } from "../store/store";
import useInView from "../hooks/useInView";
import { FaStar } from "react-icons/fa";

export default function Testimonials(){
    const { theme, lang } = useStore();
    const { ref, inView } = useInView();

    const testimonials = [
        {
            name: "Clara Beaumont",
            locationEn: "Paris, France",
            locationKa: "პარიზი, საფრანგეთი",
            text: "The cashmere sweater is absolutely divine. I've never felt fabric this soft — and after a year of wear, it still looks brand new.",
            product: "Cashmere V-Neck Sweater",
        },
        {
            name: "Marcus Webb",
            locationEn: "London, UK",
            locationKa: "ლონდონი, დიდი ბრიტანეთი",
            text: "MAISON's attention to detail is unmatched. The leather jacket has the perfect weight and drape. It's become my everyday staple.",
            product: "Leather Biker Jacket",
        },
        {
            name: "Yuki Tanaka",
            locationEn: "Tokyo, Japan",
            locationKa: "ტოკიო, იაპონია",
            text: "Fast international shipping and the quality exceeded my expectations. The wool coat is a masterpiece — elegant and warm.",
            product: "Camel Cashmere Overcoat",
        },
        {
            name: "Isabella Rossi",
            locationEn: "Milan, Italy",
            locationKa: "მილანი, იტალია",
            text: "I appreciate that MAISON focuses on sustainability without compromising style. Every piece feels intentional and luxurious.",
            product: "Silk Button-Down Blouse",
        },
    ]

    return (
        <div ref={ref} className="flex justify-center items-center flex-col mt-15 pb-15">
            <p className={`${inView ? 'slide-in-bottom-animation' : 'opacity-0'} text-[#988a7e]`}>{lang === 'en' ? 'T E S T I M O N I A L S' : 'ჩ ვ ე ნ ე ბ ე ბ ი'}</p>
            <h3 
                className={`
                    ${inView ? 'slide-in-bottom-animation' : 'opacity-0'}
                    ${theme === 'light' ? 'text-black' : 'text-white'} 
                    font text-4xl font-medium mt-2
                `}
                style={{ animationDelay: '100ms' }}
                >
                    {lang === 'en' ? 'What Our Clients Say' : 'რას ამბობენ ჩვენი კლიენტები'}
            </h3>
            <div className="flex justify-center items-center gap-7 mt-12">
                {testimonials.map((el, i) => (
                    <div 
                        key={i} 
                        className={`
                            ${inView ? 'slide-in-bottom-animation' : 'opacity-0'}
                            ${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} 
                            border rounded py-5 px-5 text-white
                        `}
                        style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="flex items-center gap-0.5 text-[#ce8a3e]">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <p className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} text-[#988a7e] border-b pb-4 w-70 mt-5`}>"{el.text}"</p>
                            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-3`}>{el.name}</p>
                            <p className="text-sm text-[#988a7e]">{lang === 'en' ? el.locationEn : el.locationKa}</p>
                            <p className="text-xs text-[#ce8a3e]">{lang === 'en' ? 'Purchased' : 'შეიძინა'}: {el.product}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}