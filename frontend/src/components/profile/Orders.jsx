import { useState, useEffect } from 'react';
import { useStore, api } from '../../store/store';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { LuShoppingBag } from "react-icons/lu";
import { LuPackage } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";

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
                    <div className='flex flex-col gap-3 mt-5'>
                        {orders.map((el, i) => (
                            <div 
                                key={i}
                                onClick={() => navigate(`/orderDetails/${el.id}`)}
                                className={`
                                    ${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc] hover:border-[#efdac2]' : 'bg-[#221d1b] border-[#38312e] hover:border-[#563e25]'} 
                                    slide-in-bottom-animation flex justify-between items-center border rounded-xl p-5 cursor-pointer transition-all duration-200
                                `}
                                style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    <div className='flex justify-center gap-3'>
                                        <div className={`${theme === 'light' ? 'bg-[#f1f0ee] text-[#78716d]' : 'bg-[#322c29] text-[#988c81]'} rounded-lg p-3`}><LuPackage size={20} /></div>
                                        <div className='flex flex-col'>
                                            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>#{el.id}</p>
                                            <div className='flex items-center gap-2'>
                                                <LuCalendar size={15} className='text-[#988a7e]' />
                                                <p className='text-xs text-[#988a7e]'>{new Date(el.created_at.replace(' ', 'T')).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {el.items.reduce((total, item) => total + item.quantity, 0)} {lang === 'en' ? 'items' : 'ნივთი'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3.5'>
                                        {el.status === 'pending' && <span className={`${theme === 'light' ? 'bg-[#f1f0ee] border-[#e5e0dc] text-[#78717e]' : 'bg-[#322c29] border-[#38312e] text-[#988c6a]'} px-3 text-sm border rounded-full`}>{lang === 'en' ? 'Pending' : 'მოლოდინში'}</span>}
                                        {el.status === 'shipped' && <span className={`${theme === 'light' ? 'bg-[#e9effb] border-[#c7d9fa] text-[#2563ec]' : 'bg-[#252731] border-[#293958] text-[#2563df]'} px-3 text-sm border rounded-full`}>{lang === 'en' ? 'Shipped' : 'გაგზავნილი'}</span>}
                                        {el.status === 'delivered' && <span className={`${theme === 'light' ? 'bg-[#e5f5ef] border-[#bbe9d9] text-[#05967a]' : 'bg-[#212d25] border-[#1d4937] text-[#059660]'} px-3 text-sm border rounded-full`}>{lang === 'en' ? 'Delivered' : 'მიწოდებული'}</span>}
                                        {el.status === 'cancelled' && <span className={`${theme === 'light' ? 'bg-[#f9e6e6] border-[#f4c0c0] text-[#e22828]' : 'bg-[#2c1d1b] border-[#3c1d1b] text-[#671d1d]'} px-3 text-sm border rounded-full`}>{lang === 'en' ? 'Cancelled' : 'გაუქმებული'}</span>}
                                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>${el.total_price.toFixed(2)}</p>
                                        <button className='text-[#988a7e] cursor-pointer'>
                                            <FaAngleRight size={18} />
                                        </button>
                                    </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}