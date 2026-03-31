import { useState, useId } from 'react';
import { useStore, api } from '../store/store';
import axios from 'axios';
import { GoLock } from "react-icons/go";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

export default function Security(){
    const { theme, lang, user } = useStore();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const currentPasswordId = useId();
    const newPasswordId = useId();
    const confirmPassword = useId();

    async function handleForm(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');
        const confirmNewPassword = formData.get('confirmNewPassword');

        if(newPassword !== confirmNewPassword){
            alert('New password and confirm new password is not a match!');
            return;
        }

        try{
            const result = await axios.put(`${api}/users/${user.id}/password`, { currentPassword, newPassword });
            alert(result.data.message);
        }catch(err){
            console.error(err);
            alert(err.response?.data?.message);
        }
    }

    return (
        <div className='slide-in-bottom-animation'>
            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Change Password' : 'პაროლის შეცვლა'}</p>
            <form onSubmit={handleForm} className={`${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} border rounded-xl mt-5 py-6 px-5 w-fit`}>
                <label htmlFor={currentPasswordId} className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{lang === 'en' ? 'Current Password' : 'მიმდინარე პაროლი'}</label>
                <div className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc]' : 'bg-[#171311] border-[#38312e]'} flex items-center gap-3 w-90 border rounded px-3 mt-1 mb-5`}>
                    <GoLock size={22} className="text-[#988a7e]" />
                    <input type={showCurrentPassword ? 'text' : 'password'} placeholder="••••••••" name="currentPassword" autoComplete="new-password" id={currentPasswordId} className={`${theme === 'light' ? 'text-black' : 'text-white'} w-full px-1 py-2 placeholder:text-[#988a7e] focus:outline-none`} />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(prev => !prev)}
                        className="cursor-pointer"
                        >
                            {showCurrentPassword ? 
                                <LuEyeOff size={20} className="text-[#988a7e]" /> 
                                :
                                <LuEye size={20} className="text-[#988a7e]" />}
                    </button>
                </div>
                
                <label htmlFor={newPasswordId} className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{lang === 'en' ? 'New Password' : 'ახალი პაროლი'}</label>
                <div className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc]' : 'bg-[#171311] border-[#38312e]'} flex items-center gap-3 w-90 border rounded px-3 mt-1`}>
                    <GoLock size={22} className="text-[#988a7e]" />
                    <input type={showNewPassword ? 'text' : 'password'} placeholder="••••••••" name="newPassword" autoComplete="new-password" id={newPasswordId} className={`${theme === 'light' ? 'text-black' : 'text-white'} w-full px-1 py-2 placeholder:text-[#988a7e] focus:outline-none`} />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(prev => !prev)}
                        className="cursor-pointer"
                        >
                            {showNewPassword ? 
                                <LuEyeOff size={20} className="text-[#988a7e]" /> 
                                :
                                <LuEye size={20} className="text-[#988a7e]" />}
                    </button>
                </div>
                <p className="text-[10px] w-90 text-[#988a7e] mt-0.5 mb-5">{lang === 'en' ? 'Must be at least 8 characters with one uppercase, one number and special symbol.' : 'უნდა იყოს მინიმუმ 8 სიმბოლო, ერთი დიდი ასოთი, ერთი ციფრით და სპეციალური სიმბოლოთი.'}</p>

                <label htmlFor={confirmPassword} className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{lang === 'en' ? 'Confirm New Password' : 'დაადასტურეთ ახალი პაროლი'}</label>
                <div className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc]' : 'bg-[#171311] border-[#38312e]'} flex items-center gap-3 w-90 border rounded px-3 mt-1 mb-6`}>
                    <GoLock size={22} className="text-[#988a7e]" />
                    <input type='password' placeholder="••••••••" name="confirmNewPassword" autoComplete="new-password" id={confirmPassword} className={`${theme === 'light' ? 'text-black' : 'text-white'} w-full px-1 py-2 placeholder:text-[#988a7e] focus:outline-none`} />
                </div>

                <button 
                    className={`
                        ${theme === 'light' ? 'bg-[#1c1917] text-white hover:bg-[#322f2e]' : 'bg-[#eeebe8] text-black hover:bg-[#d9d6d3]'}
                        font-medium text-center w-full py-1.5 rounded cursor-pointer transition-all duration-200
                    `}
                    >
                        {lang === 'en' ? 'Update Password' : 'პაროლის განახლება'}
                </button>
            </form>
        </div>
    )
}