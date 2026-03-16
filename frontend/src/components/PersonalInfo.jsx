import { useState, useEffect } from 'react';
import { useStore, api } from '../store/store';
import axios from 'axios';
import { FiEdit2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";

export default function PersonalInfo(){
    const { theme, lang, user } = useStore();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const result = await axios.get(`${api}/orders/${user.id}`);
                setOrders(result.data);
            }catch(err){
                console.error(err);
            }
        }
        fetchOrders();
    }, []);

    return (
        <div className='slide-in-bottom-animation'>
            <div className='flex justify-between items-center'>
                <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Personal Information' : 'პირადი ინფორმაცია'}</p>
                <button className={`${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200`}><FiEdit2 /> {lang === 'en' ? 'Edit' : 'რედაქტირება'}</button>
            </div>
            <div className={`${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} flex justify-center items-center flex-col border rounded-xl px-6 py-7.5 mt-7`}>
                <div className='flex justify-between items-center w-full'>
                    <div>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'FULL NAME' : 'სრული სახელი'}</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{user.full_name}</p>
                    </div>
                    <div className='mr-40 w-40'>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'EMAIL' : 'ელ. ფოსტა'}</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{user.email}</p>
                    </div>
                </div>
                <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : ' border-[#38312e]'} flex justify-between items-center w-full border-t mt-5 pt-5`}>
                    <div>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'MEMBER SINCE' : 'წევრი -დან'}</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className='mr-40 w-40'>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'TOTAL ORDERS' : 'შეკვეთები'}</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{orders.length}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex justify-between items-center mt-5'>
                    <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Saved Addresses' : 'შენახული მისამართები'}</p>
                    <button className={`${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200`}><FaPlus /> {lang === 'en' ? 'Add Address' : 'მისამართის დამატება'}</button>
                </div>
                <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} border border-dashed rounded-xl flex justify-center items-center flex-col py-10 mt-3 text-[#988a7e]`}>
                    <LuMapPin size={25} />
                    <p className='my-2'>{lang === 'en' ? 'No saved addresses yet.' : 'მისამართები ჯერ არ არის შენახული.'}</p>
                    <button className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] hover:text-white cursor-pointer transition-all duration-200`}>{lang === 'en' ? 'Add Address' : 'მისამართის დამატება'}</button>
                </div>
            </div>
        </div>
    )
}