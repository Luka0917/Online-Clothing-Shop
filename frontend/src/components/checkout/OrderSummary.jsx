import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore, api } from "../../store/store"
import { GoLock } from "react-icons/go";

export default function OrderSummary(){
    const { theme, lang, user } = useStore();
    const [userCart, setUserCart] = useState([]);

    const totalPrice = userCart.reduce((total, el) => total + el.price * el.quantity, 0);
    const shippingCost = totalPrice >= 300 ? 0 : 12;
    const tax = Math.round(totalPrice * 0.08 * 100) / 100;
    const orderTotal = totalPrice + shippingCost + tax;

    useEffect(() => {
        if(!user) return;
        async function fetchUsersCart(){
            try{
                const result = await axios.get(`${api}/cart/${user.id}`);
                setUserCart(result.data);
            }catch(err){
                console.error(`Error fetching user's cart: ${err}`);
            }
        }
        fetchUsersCart();
    }, [user]);

    return (
        <div className={`${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} slide-in-right-animation border rounded px-5 py-6 sticky top-25`}>
            <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Order Summary' : 'შეკვეთის შეჯამება'}</h3>
            <div 
                className={`
                    ${theme === 'light' ? 'scroll-light' : 'scroll-dark'}
                    ${userCart.length > 3 && 'max-h-47 overflow-y-auto pr-2'} 
                    flex flex-col gap-2.5 mt-5
                `}
                >
                    {userCart.map((el, i) => (
                        <div key={i} className='flex gap-3'>
                            <img src={el.image} alt={el.name} className='w-12 h-14 rounded-sm' />
                            <div className='flex-1'>
                                <div className={`${theme === 'light' ? 'text-black' : 'text-white'} flex justify-between items-center gap-2`}>
                                    <p className='font-medium'>{el.name.length > 19 ? el.name.slice(0, el.name.slice(0, 19).trimEnd().length) + '...' : el.name}</p>
                                    <p className='font-medium'>${(el.price * el.quantity).toFixed(2)}</p>
                                </div>
                                <p className='text-xs text-[#988a7e]'>{lang === 'en' ? 'Qty' : 'რაოდენობა'}: {el.quantity}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} border-t border-b my-4 py-2.5`}>
                <p className='text-[#988a7e] flex justify-between items-center'>{lang === 'en' ? 'Subtotal' : 'ჯამი'} <span className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>${totalPrice.toFixed(2)}</span></p>
                <p className='text-[#988a7e] flex justify-between items-center mt-1'>
                    {lang === 'en' ? 'Shipping' : 'მიწოდება'}
                    {shippingCost === 0 ? 
                        (<span className="text-[#29a36a] font-medium">{lang === 'en' ? 'Free' : 'უფასო'}</span>) 
                        :
                        (<span className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>${shippingCost}</span>)
                    }
                </p>
                <p className='text-[#988a7e] flex justify-between items-center mt-1'>{lang === 'en' ? 'Tax' : 'გადასახადი'} <span className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>${tax.toFixed(2)}</span></p>
            </div>
            <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl flex justify-between items-center`}>{lang === 'en' ? 'Total' : 'ჯამი'} <span>${orderTotal.toFixed(2)}</span></h3>
            <button
                className={`
                    ${theme === 'light' ? 'text-white bg-[#1c1917] hover:bg-[#322f2e] ' : 'text-black bg-[#eeebe8] hover:bg-[#d9d6d3]'} 
                    flex justify-center items-center gap-2 w-full text-sm font-medium mt-5 py-2.5 rounded cursor-pointer transition-all duration-200
                `}
                >
                    <GoLock size={20} /> {lang === 'en' ? 'Place Order' : 'შეკვეთის განთავსება'}
            </button>
            <p className={`${lang === 'ge' && 'text-[9px]'} text-[#988a7e] text-xs text-center mt-5`}>{lang === 'en' ? 'Your payment info is encrypted and secure.' : 'თქვენი გადახდის ინფორმაცია დაშიფრული და უსაფრთხოა.'}</p>
        </div>
    )
}