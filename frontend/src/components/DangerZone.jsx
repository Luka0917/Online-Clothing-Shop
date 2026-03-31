import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useStore, api } from '../store/store';
import axios from "axios";
import { useNavigate } from 'react-router';
import { LuTriangleAlert } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

export default function DangerZone(){
    const { theme, lang, user, clearUser } = useStore();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    async function deleteUser(){
        try{
            await axios.delete(`${api}/users/${user.id}`);
            await axios.post(`${api}/users/logout`);
            clearUser();
            navigate('/');
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className='slide-in-bottom-animation pb-44'>
            {showModal && createPortal(
                <div className='absolute top-0 left-0 w-screen h-screen bg-[#050403]/70 flex justify-center items-center z-60'>
                    <div className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc]' : 'bg-[#171311] border-[#38312e]'} scale-in-bottom-animation border rounded-md p-7 w-126 flex flex-col`}>
                        <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Are you absolutely sure?' : 'დარწმუნებული ხართ?'}</h3>
                        <p className='text-[#988a7e] text-sm mt-2'>{lang === 'en' ? 'This action cannot be undone. This will permanently delete your account and remove all associated data from our servers.' : 'ამ მოქმედების გაუქმება შეუძლებელია. ეს სამუდამოდ წაშლის თქვენს ანგარიშს და ყველა მასთან დაკავშირებულ მონაცემს ჩვენი სერვერებიდან.'}</p>
                        <div className='flex justify-end items-center gap-3 mt-7'>
                            <button
                                onClick={() => setShowModal(false)}
                                className={`${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} border rounded font-medium px-3 py-1.5 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200`}
                            >
                                {lang === 'en' ? 'Cancel' : 'გაუქმება'}
                            </button>
                            <button
                                onClick={deleteUser}
                                className={`${theme === 'light' ? 'bg-[#dc2828] hover:bg-[#de3c3c]' : 'bg-[#7f1d1d] hover:bg-[#741c1c]'} text-white font-medium py-1.5 px-3 rounded cursor-pointer transition-all duration-200`}
                            >
                                {lang === 'en' ? 'Yes, delete my account' : 'დიახ, წაშალე ჩემი ანგარიში'}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            <p className={`${theme === 'light' ? 'text-[#dc2828]' : 'text-[#7f1d1d]'} font text-xl`}>{lang === 'en' ? 'Danger Zone' : 'სახიფათო ზონა'}</p>
            <div className={`${theme === 'light' ? 'bg-[#f7ecea] border-[#efb1af]' : 'bg-[#1c1311] border-[#391715]'} border rounded-xl mt-5 p-5`}>
                <div className='flex justify-center items-start gap-3'>
                    <LuTriangleAlert size={25} className={`${theme === 'light' ? 'text-[#e14949]' : 'text-[#6e1b1b]'}`} />
                    <div className='flex justify-center items-start flex-col'>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-sm`}>{lang === 'en' ? 'Delete Account' : 'ანგარიშის წაშლა'}</p>
                        <p className='text-[#988a7e] text-xs mt-0.5'>{lang === 'en' ? 'Once you delete your account, there is no going back. All your data, order history, and saved preferences will be permanently removed.' : 'ანგარიშის წაშლის შემდეგ უკან დასახევი გზა აღარ იქნება. თქვენი ყველა მონაცემი, შეკვეთების ისტორია და შენახული პარამეტრები სამუდამოდ წაიშლება.'}</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowModal(prev => true)}
                    className={`
                        ${theme === 'light' ? 'bg-[#dc2828] hover:bg-[#de3b3b]' : 'bg-[#7f1d1d] hover:bg-[#751c1c]'}
                        flex justify-center items-center gap-2 text-white rounded font-medium mt-5 px-3 py-1 cursor-pointer transition-all duration-200
                    `}
                    >
                        <FaRegTrashAlt size={15} /> {lang === 'en' ? 'Delete My Account' : 'წაშალე ჩემი ანგარიში'}
                </button>
            </div>
        </div>
    )
}