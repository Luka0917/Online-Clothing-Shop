import { useState, useEffect } from 'react';
import { useStore, api } from '../../store/store';
import axios from 'axios';
import Addresses from './personal_info/Addresses';
import PaymentMethods from './personal_info/PaymentMethods';
import { FiEdit2 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { LuSave } from "react-icons/lu";

export default function PersonalInfo(){
    const { theme, lang, user, setUser } = useStore();

    const [editUser, setEditUser] = useState(false);
    const [fullName, setFullName] = useState(user.full_name);
    const [email, setEmail] = useState(user.email);
    const [orders, setOrders] = useState([]);

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

    async function updateUserInfo(){
        try{
            const result = await axios.put(`${api}/users/${user.id}`, { full_name: fullName, email });
            setUser(result.data.user);
            setEditUser(false);
        }catch(err){
            console.error(err);
            alert(err.response?.data?.message);
        }
    }

    return (
        <div className='slide-in-bottom-animation'>
            <div className='flex justify-between items-center'>
                <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Personal Information' : 'პირადი ინფორმაცია'}</p>
                {editUser ? (
                    <div className='slide-in-right-animation flex justify-center items-center gap-2'>
                        <button 
                            onClick={() => setEditUser(prev => !prev)} 
                            className={`
                                ${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200
                            `}
                            >
                                <RxCross2 size={20} /> {lang === 'en' ? 'Cancel' : 'გაუქმება'}
                        </button>
                        <button
                            onClick={updateUserInfo}
                            className={`
                                ${theme === 'light' ? 'bg-[#1c1917] text-white hover:bg-[#312e2d]' : 'bg-[#eeebe8] text-black hover:bg-[#d8d5d2]'}
                                flex justify-center items-center gap-2 rounded px-3 py-1 cursor-pointer transition-all duration-200
                            `}
                            >
                                <LuSave /> {lang === 'en' ? 'Save' : 'შენახვა'}
                        </button>
                    </div>
                ) : <button onClick={() => setEditUser(prev => !prev)} className={`${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200`}><FiEdit2 /> {lang === 'en' ? 'Edit' : 'რედაქტირება'}</button>}
            </div>
            <div className={`${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} flex justify-center items-center flex-col border rounded-xl px-6 py-7.5 mt-7`}>
                <div className='flex justify-between items-center gap-5 w-full'>
                    <div className='w-1/2'>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'FULL NAME' : 'სრული სახელი'}</p>
                        {editUser ? 
                            <input type='text' value={fullName} onChange={e => setFullName(e.target.value)} autoComplete="name" id='fullName' className={`${theme === 'light' ? 'bg-[#f9f7f5] text-black border-[#e5e0dc]' : 'bg-[#171311] text-white border-[#38312e]'} w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#ce8a3e] mt-1 px-2 py-1`} />
                            :
                            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{user.full_name}</p>}
                    </div>
                    <div className='w-1/2'>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'EMAIL' : 'ელ. ფოსტა'}</p>
                        {editUser ? 
                            <input type='text' value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" id='email' className={`${theme === 'light' ? 'bg-[#f9f7f5] text-black border-[#e5e0dc]' : 'bg-[#171311] text-white border-[#38312e]'} w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#ce8a3e] mt-1 px-2 py-1`} />
                            :
                            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{user.email}</p>
                        }
                    </div>
                </div>
                <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : ' border-[#38312e]'} flex justify-between items-center gap-5 w-full border-t mt-5 pt-5`}>
                    <div className='w-1/2'>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'MEMBER SINCE' : 'წევრი -დან'}</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{new Date(user.created_at.replace(' ', 'T')).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className='w-1/2'>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'TOTAL ORDERS' : 'შეკვეთები'}</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{orders.length}</p>
                    </div>
                </div>
            </div>
            <div>
                <Addresses />
                <PaymentMethods />
            </div>
        </div>
    )
}