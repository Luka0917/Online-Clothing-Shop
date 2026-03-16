import { useStore } from '../store/store';
import { FiEdit2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";

export default function PersonalInfo(){
    const { theme, lang, user } = useStore();



    return (
        <div className='slide-in-bottom-animation'>
            <div className='flex justify-between items-center'>
                <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>Personal Information</p>
                <button className={`${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200`}><FiEdit2 /> Edit</button>
            </div>
            <div className={`${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} flex justify-center items-center flex-col border rounded-xl px-6 py-7.5 mt-7`}>
                <div className='flex justify-between items-center w-full'>
                    <div>
                        <p className='text-[#988a7e] text-sm'>FULL NAME</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{user.full_name}</p>
                    </div>
                    <div className='mr-40 w-40'>
                        <p className='text-[#988a7e] text-sm'>EMAIL</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{user.email}</p>
                    </div>
                </div>
                <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : ' border-[#38312e]'} flex justify-between items-center w-full border-t mt-5 pt-5`}>
                    <div>
                        <p className='text-[#988a7e] text-sm'>MEMBER SINCE</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className='mr-40 w-40'>
                        <p className='text-[#988a7e] text-sm'>TOTAL ORDERS</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>0</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex justify-between items-center mt-5'>
                    <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>Saved Addresses</p>
                    <button className={`${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200`}><FaPlus /> Add Address</button>
                </div>
                <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} border border-dashed rounded-xl flex justify-center items-center flex-col py-10 mt-3 text-[#988a7e]`}>
                    <LuMapPin size={25} />
                    <p className='my-2'>No saved addresses yet.</p>
                    <button className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] hover:text-white cursor-pointer transition-all duration-200`}>Add Address</button>
                </div>
            </div>
        </div>
    )
}