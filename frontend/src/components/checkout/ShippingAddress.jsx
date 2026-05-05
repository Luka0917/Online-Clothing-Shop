import { useState, useEffect, useId } from 'react';
import { useStore, api } from "../../store/store"
import axios from 'axios';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";

export default function ShippingAddress({ addresses, setAddresses, useDifferentAddress, setUseDifferentAddress, addressId, cityId, stateId, ZIPCodeId, countryId, useOtherAddressId, useOtherCityId, useOtherStateId, useOtherZIPCodeId, useOtherCountryId }){
    const { theme, lang, user } = useStore();

    useEffect(() => {
        if(!user) return;
        async function fetchAddresses(){
            try{
                const result = await axios.get(`${api}/address/${user.id}`);
                setAddresses(result.data.map(el => ({
                    ...el,
                    chosen: el.is_default === 1
                })));
            }catch(err){
                console.error(`Error fetching addresses: ${err}`);
            }
        }
        fetchAddresses();
    }, [user]);

    return (
        <div className='mt-5'>
            {addresses.length > 0 ? (
                useDifferentAddress ? (
                    <div>
                        <button 
                            onClick={() => setUseDifferentAddress(false)}
                            className={`
                                ${theme === 'light' ? 'border-[#e5e0dc] text-black hover:text-white' : 'border-[#38312e] text-white'} 
                                border rounded flex justify-center items-center gap-2 px-2 py-1.5 text-sm hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200
                            `}
                            >
                                <FaLongArrowAltLeft /> {lang === 'en' ? 'Use saved address' : 'გამოიყენეთ შენახული მისამართი'}
                        </button>
        
                        <div className='slide-in-bottom-animation flex flex-col gap-5 mt-3'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor={useOtherAddressId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Address' : 'მისამართი'}</label>
                                <input type="text" required minLength={5} maxLength={100} placeholder='123 Main St' id={useOtherAddressId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                            </div>
        
                            <div className='w-full flex justify-center items-center gap-5'>
                                <div className='w-1/3 flex flex-col gap-2'>
                                    <label htmlFor={useOtherCityId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'City' : 'ქალაქი'}</label>
                                    <input type="text" required minLength={2} maxLength={50} id={useOtherCityId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded w-full px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                </div>
        
                                <div className='w-1/3 flex flex-col gap-2'>
                                    <label htmlFor={useOtherStateId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'State' : 'შტატი'}</label>
                                    <input type="text" required minLength={2} maxLength={50} id={useOtherStateId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded w-full px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                </div>
        
                                <div className='w-1/3 flex flex-col gap-2'>
                                    <label htmlFor={useOtherZIPCodeId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>ZIP {lang === 'en' ? 'Code' : 'კოდი'}</label>
                                    <input type="text" required minLength={4} maxLength={10} pattern="[0-9]*" id={useOtherZIPCodeId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded w-full px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                </div>
                            </div>
        
                            <div className='flex flex-col gap-2'>
                                <label htmlFor={useOtherCountryId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Country' : 'ქვეყანა'}</label>
                                <input type="text" required minLength={5} maxLength={100} placeholder='United States' id={useOtherCountryId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-start flex-col gap-3'>
                        {addresses.map((el, i) => (
                            <div 
                                key={i}
                                onClick={() => setAddresses(prev => prev.map((el, index) => ({ ...el, chosen: index === i })))}
                                className={`
                                    ${el.chosen
                                        ? `border-[#ce893b] ${theme === 'light' ? 'bg-[#f6f1eb]' : 'bg-[#201913]'}`
                                        : `${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'}`
                                    }
                                    slide-in-bottom-animation border rounded-md w-full flex items-center gap-3 p-3 cursor-pointer transition-all duration-200
                                `}
                                style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    <div className={`${theme === 'light' ? 'bg-[#f1f0ee]' : 'bg-[#322c29]'} text-[#988a7e] w-10 h-10 rounded-md flex justify-center items-center`}><LuMapPin size={18} /></div>
                                    <div className='flex justify-center flex-col'>
                                        <div className='flex items-center gap-2'>
                                            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{el.label}</p>
                                            {el.is_default === 1 && <span className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} border rounded text-[11px] font-medium text-[#988a7e] px-2`}>{lang === 'en' ? 'Default' : 'ძირითადი'}</span>}
                                        </div>
                                        <span className='text-xs text-[#988a7e]'>{el.street_address}, {el.city}, {el.state}, {el.ZIP_code}, {el.country}</span>
                                    </div>
                            </div>
                        ))}
                        <button 
                            type='button'
                            onClick={() => setUseDifferentAddress(true)}
                            className={`
                                ${theme === 'light' ? 'border-[#e5e0dc] text-black hover:text-white' : 'border-[#38312e] text-white'} 
                                border rounded px-2 py-1.5 text-sm hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200
                            `}
                            >
                                {lang === 'en' ? 'Use a different address' : 'სხვა მისამართის გამოყენება'}
                        </button>
                    </div>
                )
            ) : (
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor={addressId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Address' : 'მისამართი'}</label>
                        <input type="text" required minLength={5} maxLength={100} placeholder='123 Main St' id={addressId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                    </div>
        
                    <div className='w-full flex justify-center items-center gap-5   '>
                        <div className='w-1/3 flex flex-col gap-2'>
                            <label htmlFor={cityId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'City' : 'ქალაქი'}</label>
                            <input type="text" required minLength={2} maxLength={50} id={cityId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded w-full px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                        </div>
        
                        <div className='w-1/3 flex flex-col gap-2'>
                            <label htmlFor={stateId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'State' : 'შტატი'}</label>
                            <input type="text" required minLength={2} maxLength={50} id={stateId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded w-full px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                        </div>
        
                        <div className='w-1/3 flex flex-col gap-2'>
                            <label htmlFor={ZIPCodeId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>ZIP {lang === 'en' ? 'Code' : 'კოდი'}</label>
                            <input type="text" required minLength={4} maxLength={10} pattern="[0-9]*" id={ZIPCodeId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded w-full px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                        </div>
                    </div>
        
                    <div className='flex flex-col gap-2'>
                        <label htmlFor={countryId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Country' : 'ქვეყანა'}</label>
                        <input type="text" required minLength={5} maxLength={100} placeholder='United States' id={countryId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                    </div>
                </div>
            )}
        </div>        
    )
}