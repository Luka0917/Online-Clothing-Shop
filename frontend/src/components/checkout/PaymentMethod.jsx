import { useState, useEffect, useId } from 'react';
import { useStore, api } from "../../store/store";
import axios from 'axios';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { FiCreditCard } from "react-icons/fi";
import { LuBanknote } from "react-icons/lu";

export default function PaymentMethod({ paymentMethods, setPaymentMethods, useDifferentPaymentMethods, setUseDifferentPaymentMethods, paymentMethodsForm, setPaymentMethodsForm, cardNumberId, expiryId, CVCId, payPalEmailId, useOtherCardNumberId, useOtherExpiryId, useOtherCVCId, useOtherPayPalEmailId }){
    const { theme, lang, user } = useStore();

    useEffect(() => {
        if(!user) return;
        async function fetchPaymentMethods(){
            try{
                const result = await axios.get(`${api}/payment-method/${user.id}`);
                setPaymentMethods(result.data.map(el => ({
                    ...el,
                    chosen: el.is_default === 1
                })));
            }catch(err){
                console.error(`Error fetching payment methods: ${err}`);
            }
        }
        fetchPaymentMethods();
    }, [user]);

    return (
        <div className='mt-7'>
            <h2 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Payment Method' : 'გადახდის მეთოდი'}</h2>
            <div className='mt-5'>
                {paymentMethods.length > 0 ? (
                    useDifferentPaymentMethods ? (
                        <div>
                            <button
                                type='button'
                                onClick={() => setUseDifferentPaymentMethods(false)}
                                className={`${theme === 'light' ? 'border-[#e5e0dc] text-black hover:text-white' : 'border-[#38312e] text-white'} border rounded flex justify-center items-center gap-2 px-2 py-1.5 text-sm hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200`}
                            >
                                <FaLongArrowAltLeft /> {lang === 'en' ? 'Use saved method' : 'გამოიყენეთ შენახული მეთოდი'}
                            </button>
        
                            <div className='slide-in-bottom-animation'>
                                <div className='flex justify-center items-center gap-5 w-full mt-5'>
                                    {paymentMethodsForm.map((el, i) => (
                                        <div 
                                            key={i}
                                            onClick={() => setPaymentMethodsForm(prev => prev.map((el, index) => ({ ...el, chosen: index === i })))}
                                            className={`
                                                ${el.chosen 
                                                    ? `border-[#ce8a3e] text-[#ce8a3e] ${theme === 'light' ? 'bg-[#f6f1eb]' : 'bg-[#201913]'}` 
                                                    : `${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'}`
                                                }
                                                text-[#988a7e] border rounded w-full flex justify-center items-center flex-col py-5 cursor-pointer transition-all duration-200
                                            `}
                                            >
                                                {el.icon}
                                                <p className={`${theme === 'light' ? 'text-black' : 'text-white'} text-sm font-medium`}>{el.method}</p>
                                        </div>
                                    ))}
                                </div>
                                                        
                                <div className='mt-5'>
                                    {paymentMethodsForm[0].chosen && (
                                        <div className='w-full slide-in-bottom-animation'>
                                            <div className='w-full flex flex-col gap-2'>
                                                <label htmlFor={useOtherCardNumberId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Card Number' : 'ბარათის ნომერი'}</label>
                                                <input type="text" required maxLength={19} pattern="[\d\s]{13,19}" inputMode='numeric' placeholder='4242 4242 4242 4242' id={useOtherCardNumberId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                            </div>
        
                                            <div className='flex justify-center items-center gap-5 mt-5'>
                                                <div className='w-1/2 flex flex-col gap-2'>
                                                    <label htmlFor={useOtherExpiryId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Expiry' : 'ვადა'}</label>
                                                    <input type="text" required maxLength={5} pattern="(0[1-9]|1[0-2])\/\d{2}" inputMode='numeric' placeholder='MM/YY' id={useOtherExpiryId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                                </div>
                                                <div className='w-1/2 flex flex-col gap-2'>
                                                    <label htmlFor={useOtherCVCId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>CVC</label>
                                                    <input type="text" required maxLength={4} pattern="\d{3,4}" inputMode='numeric' placeholder='123' id={useOtherCVCId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {paymentMethodsForm[1].chosen && (
                                        <div className={`${theme === 'light' ? 'text-black' : 'text-white'} slide-in-bottom-animation`}>
                                            <div className='w-full flex flex-col gap-2'>
                                                <label htmlFor={useOtherPayPalEmailId}>PayPal {lang === 'en' ? 'Email' : 'ელ. ფოსტა'}</label>
                                                <input type="email" required placeholder='you@example.com' id={useOtherPayPalEmailId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                            </div>
                                            <p className='text-sm text-[#988a7e] mt-3'>{lang === 'en' ? 'You will be redirected to PayPal to complete payment.' : 'გადახდის დასასრულებლად თქვენ გადამისამართდებით PayPal-ზე.'}</p>
                                        </div>
                                    )}
                                    {paymentMethodsForm[2].chosen && (
                                        <div className={`${theme === 'light' ? 'bg-[#f6f4f2] border-[#e5e0dc]' : 'bg-[#1f1a18] border-[#38312e]'} slide-in-bottom-animation border rounded-lg py-5 flex justify-center items-center flex-col`}>
                                            <FiSmartphone size={30} className='text-[#988a7e]' />
                                            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} mt-2 font-medium`}>Apple Pay</p>
                                            <p className='text-sm text-[#988a7e]'>{lang === 'en' ? 'Confirm with Touch ID or Face ID at checkout.' : 'დაადასტურეთ Touch ID-ით ან Face ID-ით გადახდისას.'}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-start flex-col gap-3'>
                            {paymentMethods.map((el, i) => (
                                <div 
                                    key={i}
                                    onClick={() => setPaymentMethods(prev => prev.map((el, index) => ({ ...el, chosen: index === i })))}
                                    className={`
                                        ${el.chosen
                                            ? `border-[#ce893b] ${theme === 'light' ? 'bg-[#f6f1eb]' : 'bg-[#201913]'}`
                                            : `${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'}`
                                        }
                                        slide-in-bottom-animation border rounded-md w-full flex items-center gap-3 p-3 cursor-pointer transition-all duration-200
                                    `}
                                    style={{ animationDelay: `${i * 50}ms` }}
                                    >
                                        <div className={`${theme === 'light' ? 'bg-[#f1f0ee]' : 'bg-[#322c29]'} text-[#988a7e] w-10 h-10 rounded-md flex justify-center items-center`}>
                                            {el.type === 'credit_card' && <FiCreditCard size={18} />}
                                            {el.type === 'paypal' && <LuBanknote size={18} />}
                                            {el.type === 'apple_pay' && <FiSmartphone size={18} />}
                                        </div>
                                        <div className='flex justify-center flex-col'>
                                            <div className='flex items-center gap-2'>
                                                <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{el.label}</p>
                                                {el.is_default === 1 && <span className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} border rounded text-[11px] font-medium text-[#988a7e] px-2`}>{lang === 'en' ? 'Default' : 'ძირითადი'}</span>}
                                            </div>
                                            <span className='text-xs text-[#988a7e]'>
                                                {el.type === 'credit_card' && <>•••• {el.details.card_number.replace(/\s/g, '').slice(-4)} · {lang === 'en' ? 'Exp' : 'ვადა'} {el.details.expiry}</>}
                                                {el.type === 'paypal' && <>{el.details.email}</>}
                                                {el.type === 'apple_pay' && <>{el.details.device}</>}
                                            </span>
                                        </div>
                                </div>
                            ))}
                            <button 
                                type='button'
                                onClick={() => setUseDifferentPaymentMethods(true)}
                                className={`
                                    ${theme === 'light' ? 'border-[#e5e0dc] text-black hover:text-white' : 'border-[#38312e] text-white'} 
                                    border rounded px-2 py-1.5 text-sm hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200
                                `}
                                >
                                    {lang === 'en' ? 'Use a different payment method' : 'გამოიყენეთ სხვა გადახდის მეთოდი'}
                            </button>
                        </div>
                    )
                ) : (
                    <div>
                        <div className='flex justify-center items-center gap-5 w-full mt-5'>
                            {paymentMethodsForm.map((el, i) => (
                                <div 
                                    key={i}
                                    onClick={() => setPaymentMethodsForm(prev => prev.map((el, index) => ({ ...el, chosen: index === i })))}
                                    className={`
                                        ${el.chosen 
                                            ? `border-[#ce8a3e] text-[#ce8a3e] ${theme === 'light' ? 'bg-[#f6f1eb]' : 'bg-[#201913]'}` 
                                            : `${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'}`
                                        }
                                        text-[#988a7e] border rounded w-full flex justify-center items-center flex-col py-5 cursor-pointer transition-all duration-200
                                    `}
                                    >
                                        {el.icon}
                                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} text-sm font-medium`}>{el.method}</p>
                                </div>
                            ))}
                        </div>
                                                    
                        <div className='mt-5'>
                            {paymentMethodsForm[0].chosen && (
                                <div className='w-full'>
                                    <div className='w-full flex flex-col gap-2'>
                                        <label htmlFor={cardNumberId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Card Number' : 'ბარათის ნომერი'}</label>
                                        <input type="text" required maxLength={19} pattern="[\d\s]{13,19}" inputMode='numeric' placeholder='4242 4242 4242 4242' id={cardNumberId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                    </div>
        
                                    <div className='flex justify-center items-center gap-5 mt-5'>
                                        <div className='w-1/2 flex flex-col gap-2'>
                                            <label htmlFor={expiryId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Expiry' : 'ვადა'}</label>
                                            <input type="text" required maxLength={5} pattern="(0[1-9]|1[0-2])\/\d{2}" inputMode='numeric' placeholder='MM/YY' id={expiryId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                        </div>
                                        <div className='w-1/2 flex flex-col gap-2'>
                                            <label htmlFor={CVCId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>CVC</label>
                                            <input type="text" required maxLength={4} pattern="\d{3,4}" inputMode='numeric' placeholder='123' id={CVCId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {paymentMethodsForm[1].chosen && (
                                <div className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                    <div className='w-full flex flex-col gap-2'>
                                        <label htmlFor={payPalEmailId}>PayPal {lang === 'en' ? 'Email' : 'ელ. ფოსტა'}</label>
                                        <input type="email" required placeholder='you@example.com' id={payPalEmailId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 placeholder:text-[#988a7e] focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                    </div>
                                    <p className='text-sm text-[#988a7e] mt-3'>{lang === 'en' ? 'You will be redirected to PayPal to complete payment.' : 'გადახდის დასასრულებლად თქვენ გადამისამართდებით PayPal-ზე.'}</p>
                                </div>
                            )}
                            {paymentMethodsForm[2].chosen && (
                                <div className={`${theme === 'light' ? 'bg-[#f6f4f2] border-[#e5e0dc]' : 'bg-[#1f1a18] border-[#38312e]'} border rounded-lg py-5 flex justify-center items-center flex-col`}>
                                    <FiSmartphone size={30} className='text-[#988a7e]' />
                                    <p className={`${theme === 'light' ? 'text-black' : 'text-white'} mt-2 font-medium`}>Apple Pay</p>
                                    <p className='text-sm text-[#988a7e]'>{lang === 'en' ? 'Confirm with Touch ID or Face ID at checkout.' : 'დაადასტურეთ Touch ID-ით ან Face ID-ით გადახდისას.'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>    
    )
}