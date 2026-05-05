import { useState, useEffect, useId } from 'react';
import { useStore, api } from '../store/store';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import axios from 'axios';
import NavBar from '../components/Navbar';
import ShippingAddress from '../components/checkout/ShippingAddress';
import PaymentMethod from '../components/checkout/PaymentMethod';
import OrderSummary from '../components/checkout/OrderSummary';
import Footer from '../components/Footer';
import { FaArrowLeft } from "react-icons/fa6";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { LuBanknote } from "react-icons/lu";
import { FiSmartphone } from "react-icons/fi";
import { PiCheckCircleBold } from "react-icons/pi";

export default function Checkout(){
    const { theme, lang, user, clearCart } = useStore();
    const firstName = user ? user.full_name.split(' ')[0] : '';
    const lastName = user ? user.full_name.split(' ')[1] : '';
    const email = user ? user.email : '';
    const [addresses, setAddresses] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [useDifferentAddress, setUseDifferentAddress] = useState(false);
    const [useDifferentPaymentMethods, setUseDifferentPaymentMethods] = useState(false);
    const [paymentMethodsForm, setPaymentMethodsForm] = useState([
        { icon: <FiCreditCard size={22} />, method: 'Credit Card', chosen: true },
        { icon: <LuBanknote size={22} />, method: 'PayPal', chosen: false },
        { icon: <FiSmartphone size={22} />, method: 'Apple Pay', chosen: false }
    ]);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const navigate = useNavigate();

    const firstNameId = useId();
    const lastNameId = useId();
    const emailId = useId();

    const addressId = useId();
    const cityId = useId();
    const stateId = useId();
    const ZIPCodeId = useId();
    const countryId = useId();

    const useOtherAddressId = useId();
    const useOtherCityId = useId();
    const useOtherStateId = useId();
    const useOtherZIPCodeId = useId();
    const useOtherCountryId = useId();

    const cardNumberId = useId();
    const expiryId = useId();
    const CVCId = useId();
    const payPalEmailId = useId();

    const useOtherCardNumberId = useId();
    const useOtherExpiryId = useId();
    const useOtherCVCId = useId();
    const useOtherPayPalEmailId = useId();

    async function placeOrder(e){
        e.preventDefault();

        try{
            let address_id = null;
            let payment_method_id = null;
            let shipping_address = null;
            let payment_method = null;

            if(addresses.length > 0 && !useDifferentAddress){
                address_id = addresses.find(el => el.chosen)?.id;
            }else{
                const label = `Address ${addresses.length + 1}`;
                const street_address = e.target.querySelector(`#${CSS.escape(useDifferentAddress ? useOtherAddressId : addressId)}`).value;
                const city = e.target.querySelector(`#${CSS.escape(useDifferentAddress ? useOtherCityId : cityId)}`).value;
                const state = e.target.querySelector(`#${CSS.escape(useDifferentAddress ? useOtherStateId : stateId)}`).value;
                const ZIP_code = e.target.querySelector(`#${CSS.escape(useDifferentAddress ? useOtherZIPCodeId : ZIPCodeId)}`).value;
                const country = e.target.querySelector(`#${CSS.escape(useDifferentAddress ? useOtherCountryId : countryId)}`).value;

                const addressResult = await axios.post(`${api}/address/${user.id}`, { label, street_address, city, state, ZIP_code, country });
                address_id = addressResult.data.id;

                shipping_address = { label, street_address, city, state, ZIP_code, country };
            }

            if(paymentMethods.length > 0 && !useDifferentPaymentMethods){
                payment_method_id = paymentMethods.find(el => el.chosen)?.id;
            }else{
                const chosenType = paymentMethodsForm.find(el => el.chosen);
                let type;
                let label;
                let details;

                if(chosenType.method === 'Credit Card'){
                    const cardNumber = e.target.querySelector(`#${CSS.escape(useDifferentPaymentMethods ? useOtherCardNumberId : cardNumberId)}`).value;
                    const expiry = e.target.querySelector(`#${CSS.escape(useDifferentPaymentMethods ? useOtherExpiryId : expiryId)}`).value;
                    const cvc = e.target.querySelector(`#${CSS.escape(useDifferentPaymentMethods ? useOtherCVCId : CVCId)}`).value
                    type = 'credit_card';
                    label = `Card ending ${cardNumber.replace(/\s/g, '').slice(-4)}`;
                    details = { card_number: cardNumber, expiry, cvc }
                }else if(chosenType.method === 'PayPal'){
                    const paypalEmail = e.target.querySelector(`#${CSS.escape(useDifferentPaymentMethods ? useOtherPayPalEmailId : payPalEmailId)}`).value;
                    type = 'paypal';
                    label = `PayPal (${paypalEmail})`;
                    details = { email: paypalEmail };
                }else{
                    type = 'apple_pay';
                    label = 'Apple Pay';
                    details = {};
                }

                const paymentResult = await axios.post(`${api}/payment-method/${user.id}`, { type, label, details });
                payment_method_id = paymentResult.data.id;

                payment_method = { type, label, details };
            }

            const result = await axios.post(`${api}/orders/${user.id}/checkout`, { address_id, payment_method_id, shipping_address, payment_method });

            clearCart();
            setOrderId(result.data.order_id);
            setOrderConfirmed(true);
        }catch(err){
            console.error(err);
            alert(err.response?.data?.message);
        }
    }

    return (
        <div className={`${theme === 'light' ? 'bg-[#f9f7f5]' : 'bg-[#171311]'} min-h-screen transition-all duration-200`}>
            <NavBar />
            {orderConfirmed ? (
                <div className='flex justify-center items-center flex-col pt-50 pb-55'>
                    <PiCheckCircleBold size={80} className='scale-in-center-animation text-[#ce8a3e]' />
                    <div className='slide-in-bottom-animation text-center'>
                        <h2 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-3xl mt-3`}>{lang === 'en' ? 'Order Confirmed!' : 'შეკვეთა დადასტურებულია!'}</h2>
                        <p className='text-[#988a7e] text-lg mt-2'>{lang === 'en' ? 'Thank you for your purchase,' : 'გმადლობთ შენაძენისთვის,'} {firstName + lastName}.</p>
                        <p className='text-[#988a7e] text-center w-95 mt-1'>{lang === 'en' ? `Your order #${orderId} has been placed. You'll receive a confirmation email shortly.` : `თქვენი შეკვეთა #${orderId} განთავსდა. მალე მიიღებთ დადასტურების ელ. ფოსტას.`}</p>
                        <button
                            onClick={() => navigate('/shop?category=all&stock=true&sort=default')}
                            className={`
                                ${theme === 'light' ? 'bg-[#1c1917] text-white hover:bg-[#312e2d]' : 'bg-[#eeebe8] text-black hover:bg-[#d8d5d2]'} 
                                px-3 py-1.5 font-medium rounded mt-5 cursor-pointer transition-all duration-200
                            `}
                            >
                                {lang === 'en' ? 'Continue Shopping' : 'შოპინგის გაგრძელება'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center flex-col px-120 py-30">
                    <Link to='/cart' className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} flex items-center gap-2 text-[#988a7e] transition-all duration-200`}><FaArrowLeft /> {lang === 'en' ? 'Back to cart' : 'კალათაში დაბრუნება'}</Link>
                    <h2 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-3xl mt-10`}>{lang === 'en' ? 'Checkout' : 'გადახდა'}</h2>
                    <form onSubmit={placeOrder} className='flex justify-between items-start'>
                        <div className='slide-in-bottom-animation mt-8 w-140'>
                            <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Shipping Address' : 'მიწოდების მისამართი'}</h3>

                            <div className='w-full flex justify-center items-center gap-5 mt-5'>
                                <div className='w-1/2 flex flex-col gap-2'>
                                    <label htmlFor={firstNameId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'First Name' : 'სახელი'}</label>
                                    <input type="text" required minLength={2} maxLength={50} defaultValue={firstName} id={firstNameId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                </div>
                                <div className='w-1/2 flex flex-col gap-2'>
                                    <label htmlFor={lastNameId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Last Name' : 'გვარი'}</label>
                                    <input type="text" required minLength={2} maxLength={50} defaultValue={lastName} id={lastNameId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                </div>
                            </div>
                        
                            <div className='w-full flex flex-col gap-2 mt-5'>
                                <label htmlFor={emailId} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{lang === 'en' ? 'Email' : 'ელ. ფოსტა'}</label>
                                <input type="email" required defaultValue={email} id={emailId} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e] text-white'} border rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                            </div>

                            <ShippingAddress
                                addresses={addresses}
                                setAddresses={setAddresses}
                                useDifferentAddress={useDifferentAddress}
                                setUseDifferentAddress={setUseDifferentAddress}
                                addressId={addressId}
                                cityId={cityId}
                                stateId={stateId}
                                ZIPCodeId={ZIPCodeId}
                                countryId={countryId}
                                useOtherAddressId={useOtherAddressId}
                                useOtherCityId={useOtherCityId}
                                useOtherStateId={useOtherStateId}
                                useOtherZIPCodeId={useOtherZIPCodeId}
                                useOtherCountryId={useOtherCountryId}
                            />
                            <PaymentMethod
                                paymentMethods={paymentMethods}
                                setPaymentMethods={setPaymentMethods}
                                useDifferentPaymentMethods={useDifferentPaymentMethods}
                                setUseDifferentPaymentMethods={setUseDifferentPaymentMethods}
                                paymentMethodsForm={paymentMethodsForm}
                                setPaymentMethodsForm={setPaymentMethodsForm}
                                cardNumberId={cardNumberId}
                                expiryId={expiryId}
                                CVCId={CVCId}
                                payPalEmailId={payPalEmailId}
                                useOtherCardNumberId={useOtherCardNumberId}
                                useOtherExpiryId={useOtherExpiryId}
                                useOtherCVCId={useOtherCVCId}
                                useOtherPayPalEmailId={useOtherPayPalEmailId}
                            />
                        </div>
                        <OrderSummary />
                    </form>
                </div>
            )}
            <Footer />
        </div>
    )
}