import { useState, useEffect } from "react";
import { useStore, api } from "../store/store";
import axios from "axios";
import { Link, useParams } from "react-router";
import { createPortal } from 'react-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { LuCalendar } from "react-icons/lu";
import { LuMapPin } from "react-icons/lu";
import { FiCreditCard } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";

export default function OrderDetails(){
    const { theme, lang, user } = useStore();
    const [orderDetails, setOrderDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { orderId } = useParams();

    async function fetchOrderDetails(){
        try{
            const result = await axios.get(`${api}/orders/${user.id}/${orderId}`);
            setOrderDetails(result.data);
        }catch(err){
            console.error(`Error fetching orders: ${err}`);
        }
    }

    useEffect(() => {
        if(!user) return;
        fetchOrderDetails();
    }, [user]);

    useEffect(() => {
        if(showModal){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = '';
        }
        return () => document.body.style.overflow = '';
    }, [showModal]);

    async function cancelOrder(){
        try{
            const result = await axios.put(`${api}/orders/${orderId}`, { status: 'cancelled' });
            await fetchOrderDetails();
            setShowModal(false);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className={`${theme === 'light' ? 'bg-[#f9f7f5]' : 'bg-[#171311]'} min-h-screen transition-all duration-200`}>
            <Navbar />
            <div className="flex justify-center flex-col px-150 py-30">
                {showModal && createPortal(
                    <div className='fixed top-0 left-0 w-full h-screen bg-[#050403]/70 flex justify-center items-center z-60'>
                        <div className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc]' : 'bg-[#171311] border-[#38312e]'} scale-in-bottom-animation border rounded-md w-130 p-5`}>
                            <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl font-medium`}>{lang === 'en' ? 'Cancel this order?' : 'გავაუქმოთ ეს შეკვეთა?'}</h3>
                            <p className={`${lang === 'ge' && 'text-sm'} text-[#988a7e] mt-2.5 w-98`}>{lang === 'en' ? `Are you sure you want to cancel order #${orderDetails.id}? This action cannot be undone.` : `დარწმუნებული ხართ, რომ გსურთ შეკვეთის #${orderDetails.id} გაუქმება? ამ მოქმედების გაუქმება შეუძლებელია.`}</p>
                            <p className={`${lang === 'ge' && 'text-sm'} text-[#988a7e] mt-2 text-left w-119`}>
                                {lang === 'en' ? 'Please note' : 'გთხოვთ გაითვალისწინოთ'}:
                                <span className={`${theme === 'light' ? 'text-[#e04141]' : 'text-[#731c1c]'} font-medium`}> {lang === 'en' ? '10% of the paid amount will be deducted' : 'გადახდილი თანხის 10% ჩამოიჭრება'} </span>
                                {lang === 'en' ? 'as a cancellation fee. The remaining balance will be refunded within 5-7 business days.' : 'გაუქმების საკომისიოს სახით. დარჩენილი თანხა 5-7 სამუშაო დღის განმავლობაში დაგიბრუნდებათ.'}
                            </p>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className={`
                                        ${lang === 'ge' && 'text-xs'}
                                        ${theme === 'light' ? 'border-[#e5e0dc] text-black' : 'border-[#38312e] text-white'} 
                                        border rounded px-3 py-1.5 font-medium hover:bg-[#ce8a3e] hover:text-white cursor-pointer transition-all duration-200
                                    `}
                                    >
                                        {lang === 'en' ? 'Keep Order' : 'შეკვეთის შენახვა'}
                                </button>
                                <button
                                    onClick={cancelOrder}
                                    className={`
                                        ${lang === 'ge' && 'text-xs'}
                                        ${theme === 'light' ? 'bg-[#dc2828] hover:bg-[#de3c3c]' : 'bg-[#7f1d1d] hover:bg-[#741c1c]'} 
                                        rounded text-white px-3 py-1.5 font-medium cursor-pointer transition-all duration-200
                                    `}
                                    >
                                        {lang === 'en' ? 'Yes, cancel order' : 'დიახ, გააუქმეთ შეკვეთა'}
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

                <Link to={'/profile?section=Orders'} className={`${theme === 'light' ? 'text-black' : 'text-white'} flex items-center w-fit gap-2 rounded py-1 px-3 hover:bg-[#ce8a3e] hover:text-white transition-all duration-200`}><FaArrowLeft /> {lang === 'en' ? 'Back to Orders' : 'შეკვეთებზე დაბრუნება'}</Link>
                <div>
                    {orderDetails && (
                        <>
                            <div className="mt-5 flex justify-between items-center">
                                <div className="slide-in-left-animation">
                                    <h2
                                        className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-3xl flex items-center`}
                                        >
                                            {lang === 'en' ? 'Order' : 'შეკვეთა'} 
                                            <span className="text-[#988a7e] ml-2">#</span>
                                            {orderDetails.id}
                                    </h2>
                                    <p className="flex items-center gap-2 text-[#988a7e] mt-2"><LuCalendar /> {new Date(orderDetails.created_at.replace(' ', 'T')).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {orderDetails.items.reduce((total, item) => total + item.quantity, 0)} {lang === 'en' ? 'items' : 'ნივთი'}</p>
                                </div>
                                <div className="slide-in-right-animation flex justify-center items-center gap-5">
                                    {orderDetails.status === 'pending' && <div className={`${theme === 'light' ? 'bg-[#f1f0ee] border-[#e5e0dc] text-[#78717e]' : 'bg-[#322c29] border-[#38312e] text-[#988c6a]'} px-5 py-0.5 flex font-medium border rounded-full`}>{lang === 'en' ? 'Pending' : 'მოლოდინში'}</div>}
                                    {orderDetails.status === 'shipped' && <div className={`${theme === 'light' ? 'bg-[#e6ebf5] border-[#c4d5f5] text-[#2563ec]' : 'bg-[#1b1e28] border-[#223251] text-[#2563df]'} px-5 py-0.5 flex font-medium border rounded-full`}>{lang === 'en' ? 'Shipped' : 'გაგზავნილი'}</div>}
                                    {orderDetails.status === 'delivered' && <div className={`${theme === 'light' ? 'bg-[#e2f1e9] border-[#b8e5d4] text-[#299669]' : 'bg-[#17241c] border-[#164230] text-[#089669]'} px-5 py-0.5 flex font-medium border rounded-full`}>{lang === 'en' ? 'Delivered' : 'მიწოდებული'}</div>}
                                    {orderDetails.status === 'cancelled' && <div className={`${theme === 'light' ? 'bg-[#f6e2e0] border-[#f1bcbb] text-[#de2828]' : 'bg-[#221412] border-[#341614] text-[#731d1d]'} px-5 py-0.5 flex font-medium border rounded-full`}>{lang === 'en' ? 'Cancelled' : 'გაუქმებული'}</div>}
                                    {orderDetails.status === 'pending' && (
                                        <button 
                                            onClick={() => setShowModal(true)} 
                                            className={`
                                                ${theme === 'light' ? 'text-[#dc2870] border-[#f0b9b8] hover:bg-[#f6e2e0]' : 'text-[#7f1d19] border-[#361615] hover:bg-[#221412]'} 
                                                flex justify-center items-center gap-2 border rounded py-1 px-3 cursor-pointer transition-all duration-200
                                            `}
                                            >
                                                <TiDeleteOutline size={20} /> {lang === 'en' ? 'Cancel Order' : 'შეკვეთის გაუქმება'}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className={`${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} slide-in-bottom-animation border rounded-xl mt-7`}>
                                <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font pt-5 pl-5`}>{lang === 'en' ? 'Items' : 'ნივთები'}</p>
                                <div className="mt-3 flex flex-col gap-3 px-5">
                                    {orderDetails.items.map((el, i) => (
                                        <div key={i} className="slide-in-bottom-animation flex items-center gap-2" style={{ animationDelay: `${i * 100}ms` }}>
                                            <img src={el.image} alt={el.name} className="h-16 w-18 rounded-lg" />
                                            <div className="flex justify-between items-center w-full">
                                                <div>
                                                    <p className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{el.name}</p>
                                                    <p className="text-sm text-[#988a7e]">${el.price_at_time} x {el.quantity}</p>
                                                </div>
                                                <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>${(el.price_at_time * el.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} flex items-start gap-40 border-y p-5 mt-5`}>
                                    <div>
                                        <p className="font flex items-center gap-2 text-[#988a7e] text-sm"><LuMapPin /> {lang === 'en' ? 'SHIPPING ADDRESS' : 'მიწოდების მისამართი'}</p>
                                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{orderDetails.shipping_address.label}</p>
                                        <p className="text-[#988a7e]">{orderDetails.shipping_address.street_address}</p>
                                        <p className="text-[#988a7e]">{orderDetails.shipping_address.city}, {orderDetails.shipping_address.state} {orderDetails.shipping_address.ZIP_code}</p>
                                        <p className="text-[#988a7e]">{orderDetails.shipping_address.country}</p>
                                    </div>
                                    <div>
                                        <p className="font flex items-center gap-2 text-[#988a7e] text-sm"><FiCreditCard /> {lang === 'en' ? 'PAYMENT METHOD' : 'გადახდის მეთოდი'}</p>
                                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{orderDetails.payment_method.label}</p>
                                        <p className="text-[#988a7e]">
                                            {orderDetails.payment_method.type === 'credit_card' && <>•••• {orderDetails.payment_method.details.card_number.replace(/\s/g, '').slice(-4)} · {lang === 'en' ? 'Exp' : 'ვადა'} {orderDetails.payment_method.details.expiry}</>}
                                            {orderDetails.payment_method.type === 'paypal' && <>{orderDetails.payment_method.details.email}</>}
                                            {orderDetails.payment_method.type === 'apple_pay' && <>Apple Pay</>}
                                        </p>
                                    </div>
                                </div>
                                <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} px-5 py-3 flex justify-between items-center text-lg font-medium`}>
                                    <span>{lang === 'en' ? 'Total' : 'ჯამი'}</span>
                                    <span>${orderDetails.total_price.toFixed(2)}</span>
                                </h3>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}