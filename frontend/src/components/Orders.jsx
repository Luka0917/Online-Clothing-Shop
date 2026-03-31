import { useState, useEffect } from 'react';
import { useStore, api } from '../store/store';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { LuShoppingBag } from "react-icons/lu";

export default function Orders(){
    const { theme, lang, user } = useStore();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const result = await axios.get(`${api}/orders/${user.id}`);
                setOrders(result.data);
            }catch(err){
                console.error(`Error fetching orders: ${err}`);
            }
        }
        fetchOrders();
    }, []);


    return (
        <div className='slide-in-bottom-animation'>
            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Order History' : 'შეკვეთის ისტორია'}</p>
            <div>
                {orders.length === 0 ? (
                    <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} border border-dashed rounded-xl flex justify-center items-center flex-col py-15 mt-3 text-[#988a7e]`}>
                        <div className={`${theme === 'light' ? 'bg-[#f1f0ee] text-[#78716d]' : 'bg-[#322c29] text-[#988c81]'} w-15 h-15 rounded-full flex justify-center items-center`}><LuShoppingBag size={30} /></div>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-lg mt-5`}>{lang === 'en' ? 'No orders yet' : 'შეკვეთები ჯერ არ არის'}</p>
                        <p className='text-sm text-center w-78 mt-1'>{lang === 'en' ? 'When you place your first order, it will appear here with tracking details.' : 'როდესაც პირველ შეკვეთას განათავსებთ, ის აქ გამოჩნდება თვალთვალის დეტალებით.'}</p>
                        <button onClick={() => navigate('/shop?category=all&stock=true&sort=default')} className={`${theme === 'light' ? 'border-[#e5e0dc] text-black' : 'border-[#38312e] text-white'} flex justify-center items-center gap-2 border rounded px-3 py-1 mt-5 hover:bg-[#ce8a3e] hover:text-white cursor-pointer transition-all duration-200`}>{lang === 'en' ? 'Browse Collection' : 'ნახეთ კოლექცია'}</button>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}