import { useState, useEffect, useId } from 'react';
import { useStore, api } from '../../../store/store';
import axios from 'axios';
import { FaPlus } from "react-icons/fa6";
import { LuSave } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { FiCreditCard } from "react-icons/fi";
import { LuBanknote } from "react-icons/lu";
import { FiSmartphone } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

export default function PaymentMethods(){
    const { theme, lang, user } = useStore();
    const [refresh, setRefresh] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [addPaymentMethod, setAddPaymentMethods] = useState(false);
    const [paymentMethodsForm, setPaymentMethodsForm] = useState([
        { icon: <FiCreditCard size={22} />, method: 'Credit Card', chosen: true },
        { icon: <LuBanknote size={22} />, method: 'PayPal', chosen: false },
        { icon: <FiSmartphone size={22} />, method: 'Apple Pay', chosen: false }
    ]);

    const cardLabelId = useId();
    const cardNumberId = useId();
    const cardExpiryId = useId();
    const cardCVCId = useId();
    const payPalEmailId = useId();
    const applePayLabelId = useId();

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try{
                const result = await axios.get(`${api}/payment-method/${user.id}`);
                setPaymentMethods(result.data);
            }catch(err){
                console.error(`Error fetching payment methods: ${err}`);
            }
        }
        fetchPaymentMethods();
    }, [refresh]);

    async function handlePaymentMethodForm(e){
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const label = formData.get('label');

        const selectedMethod = paymentMethodsForm.find(el => el.chosen).method;

        let payload = {};

        if(selectedMethod === 'Credit Card'){
            const cardNumber = formData.get('cardNumber');
            const expiry = formData.get('expiry');
            const cvc = formData.get('cvc');
            const cleanNumber = cardNumber?.replace(/\s+/g, '');
            const lastFourDigits = cleanNumber?.slice(-4);
            const finalLabel = label?.trim()
                ? label
                : `Card ending ${lastFourDigits}`;

            payload = {
                type: 'credit_card',
                label: finalLabel,
                details: {
                    card_number: cardNumber,
                    expiry,
                    cvc
                }
            };
        }else if(selectedMethod === 'PayPal'){
            const email = formData.get('email');
            const finalLabel = label?.trim()
                ? label
                : `PayPal (${email})`;

            payload = {
                type: 'paypal',
                label: finalLabel,
                details: { email }
            };
        }else if(selectedMethod === 'Apple Pay'){
            const device = formData.get('device') || 'Iphone';
            const finalLabel = label?.trim()
                ? label
                : device?.trim()
                    ? `Apple Pay - ${device}`
                    : `Apple Pay`;
            
            payload = {
                type: 'apple_pay',
                label: finalLabel,
                details: { device }
            };
        };

        try{
            await axios.post(`${api}/payment-method/${user.id}`, payload);
            setAddPaymentMethods(false);
            setRefresh(prev => !prev);
        }catch(err){
            console.error(err);
            alert(err.response?.data?.message);
        }
    };

    async function deletePaymentMethod(id){
        try{
            await axios.delete(`${api}/payment-method/${id}`);
            setRefresh(prev => !prev);
        }catch(err){
            console.error(err);
        }
    };

    async function setPaymentMethodsDefault(id){
        try{
            await axios.patch(`${api}/payment-method/${id}`, { user_id: user.id });
            setRefresh(prev => !prev);
        }catch(err){
            console.error(err);
        }
    };

    // console.log(paymentMethods);

    return (
        <div>
            <div className='flex justify-between items-center mt-5'>
                <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Payment Methods' : 'გადახდის მეთოდები'}</h3>
                <button
                    onClick={() => setAddPaymentMethods(true)}
                    className={`
                        ${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} 
                        flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200
                    `}
                    >
                        <FaPlus /> {lang === 'en' ? 'Add Method' : 'მეთოდის დამატება'}
                </button>
            </div>

            {addPaymentMethod && (
                <form onSubmit={handlePaymentMethodForm} className={`${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} slide-in-bottom-animation border rounded-xl mt-3 px-5 py-6`}>
                    <p className='text-sm text-[#988a7e] font-medium'>{lang === 'en' ? 'METHOD TYPE' : 'მეთოდის ტიპი'}</p>
                    <div className='flex justify-center items-center gap-5 mt-5'>
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

                    {paymentMethodsForm[0].chosen && (
                        <div className='mt-5'>
                            <div className='flex flex-col'>
                                <label htmlFor={cardLabelId} className='text-[#988a7e]'>{lang === 'en' ? 'LABEL (OPTIONAL)' : 'ეტიკეტი (არასავალდებულო)'}</label>
                                <input type="text" placeholder='e.g. Personal Visa' name='label' id={cardLabelId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor={cardNumberId} className='text-[#988a7e] mt-5'>{lang === 'en' ? 'Card Number' : 'ბარათის ნომერი'} *</label>
                                <input type="text" required placeholder='4242 4242 4242 4242' name='cardNumber' id={cardNumberId} maxLength={19} pattern="[\d\s]{19}" inputMode='numeric' className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                            </div>

                            <div className='w-full flex gap-5 mt-5'>
                                <div className='w-1/2 flex flex-col'>
                                    <label htmlFor={cardExpiryId} className='text-[#988a7e]'>{lang === 'en' ? 'Expiry' : 'ვადის გასვლა'} *</label>
                                    <input type="text" required placeholder='MM/YY' name='expiry' id={cardExpiryId} maxLength={5} pattern='(0[1-9]|1[0-2])\/\d{2}' inputMode='numeric' className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                </div>

                                <div className='w-1/2 flex flex-col'>
                                    <label htmlFor={cardCVCId} className='text-[#988a7e]'>CVC *</label>
                                    <input type="text" required placeholder='123' name='cvc' id={cardCVCId} maxLength={4} pattern="\d{3,4}" inputMode='numeric' className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethodsForm[1].chosen && (
                        <div className='flex flex-col mt-5'>
                            <label htmlFor={payPalEmailId} className='text-[#988a7e]'>PAYPAL {lang === 'en' ? 'EMAIL' : 'ელ.ფოსტა'} *</label>
                            <input type="email" required placeholder='you@example.com' name='email' id={payPalEmailId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                        </div>
                    )}

                    {paymentMethodsForm[2].chosen && (
                        <div className='flex flex-col mt-5'>
                            <label htmlFor={applePayLabelId} className='text-[#988a7e]'>{lang === 'en' ? 'DEVICE NAME (OPTIONAL)' : 'მოწყობილობის სახელი (არასავალდებულო)'}</label>
                            <input type="text" placeholder='e.g. IPhone 15' name='device' id={applePayLabelId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                        </div>
                    )}

                    <div className='flex justify-start items-center gap-2 mt-5'>
                        <button
                            type='submit'
                            className={`
                                ${theme === 'light' ? 'bg-[#1c1917] text-white hover:bg-[#312e2d]' : 'bg-[#eeebe8] text-black hover:bg-[#d8d5d2]'}
                                flex justify-center items-center gap-2 rounded px-3 py-1 cursor-pointer transition-all duration-200
                            `}
                            >
                                <LuSave /> {lang === 'en' ? 'Save' : 'შენახვა'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setAddPaymentMethods(false)}
                            className={`
                                ${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} 
                                flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200
                            `}
                            >
                                <RxCross2 size={20} /> {lang === 'en' ? 'Cancel' : 'გაუქმება'}
                        </button>
                    </div>                     
                </form>
            )}
            {paymentMethods.length > 0 ? (
                <div className='flex flex-col gap-3 mt-5'>
                    {paymentMethods.map((el, i) => (
                            <div
                                key={i} 
                                className={`
                                    ${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} 
                                    slide-in-bottom-animation border rounded-xl p-4 w-full flex justify-between items-center
                                `}
                                style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    <div className='flex justify-center items-center gap-3'>
                                        <div className={`${theme === 'light' ? 'bg-[#f1f0ee]' : 'bg-[#322c29]'} text-[#988a7e] w-10 h-10 rounded-lg flex justify-center items-center`}>
                                            {el.type === 'credit_card' && <FiCreditCard size={18} />}
                                            {el.type === 'paypal' && <LuBanknote size={18} />}
                                            {el.type === 'apple_pay' && <FiSmartphone size={18} />}
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex items-center gap-2'>
                                                <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{el.label}</p>
                                                {el.is_default === 1 && <span className={`${theme === 'light' ? 'border-[#e5e0dc] text-black' : 'border-[#38312e] text-white'} border rounded-xl text-[11px] font-medium px-2`}>{lang === 'en' ? 'Default' : 'ძირითადი'}</span>}
                                            </div>
                                            <span className='text-xs text-[#988a7e]'>
                                                {el.type === 'credit_card' && <>•••• {el.details.card_number.replace(/\s/g, '').slice(-4)} · {lang === 'en' ? 'Exp' : 'ვადა'} {el.details.expiry}</>}
                                                {el.type === 'paypal' && <>{el.details.email}</>}
                                                {el.type === 'apple_pay' && <>{el.details.device}</>}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center gap-2'>
                                        {el.is_default === 0 && 
                                            <button onClick={() => setPaymentMethodsDefault(el.id)} className={`${theme === 'light' ? 'text-black' : 'text-white'} hover:bg-[#ce8a3e] hover:text-white py-1.75 px-2.5 rounded text-sm cursor-pointer transition-all duration-200`}>{lang === 'en' ? 'Set Default' : 'ძირითადად დაყენება'}</button>
                                        }
                                        <button onClick={() => deletePaymentMethod(el.id)} className={`${theme === 'light' ? 'text-[#dc2828]' : 'text-[#7f1d1d]'} hover:bg-[#ce8a3e] hover:text-white p-1.75 rounded cursor-pointer transition-all duration-200`}><FaRegTrashAlt /></button>
                                    </div>
                            </div>
                    ))}
                </div>
            ) : (
                !addPaymentMethod && (
                    <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} slide-in-bottom-animation border border-dashed rounded-xl flex justify-center items-center flex-col py-10 mt-3 text-[#988a7e]`}>
                        <FiCreditCard size={25} />
                        <p className='my-2'>{lang === 'en' ? 'No saved payment methods yet.' : 'გადახდის შენახული მეთოდები ჯერ არ არის.'}</p>
                        <button onClick={() => setAddPaymentMethods(true)} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] hover:text-white cursor-pointer transition-all duration-200`}>{lang === 'en' ? 'Add Payment Method' : 'დაამატეთ გადახდის მეთოდი'}</button>
                    </div>
                )
            )}
        </div>
    )
}