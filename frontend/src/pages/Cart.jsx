import { useState, useEffect } from "react"
import { useStore, api } from "../store/store"
import { Link } from 'react-router'
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { TiDeleteOutline } from "react-icons/ti";
import { LuShoppingCart } from "react-icons/lu";
import { GoLock } from "react-icons/go";
import { FiCreditCard } from "react-icons/fi";
import { LuTruck } from "react-icons/lu";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export default function Cart(){
    const { theme, lang, user, cart, addItem, removeItem, clearCart, } = useStore();
    const [userCart, setUsercart] = useState([]);
    const [bottomProducts, setBottomProducts] = useState([]);
    const navigate = useNavigate();

    const totalPrice = userCart.reduce((total, el) => total + el.price * el.quantity, 0);
    const shippingCost = totalPrice >= 300 ? 0 : 12;
    const tax = Math.round(totalPrice * 0.08 * 100) / 100;
    const orderTotal = totalPrice + shippingCost + tax;

    useEffect(() => {
        if(!user){
            navigate('/auth');
            return;
        }
        const fetchCart = async () => {
            try{
                const result = await axios.get(`${api}/cart/${user.id}`);
                setUsercart(result.data);
            }catch(err){
                console.error(`Error fetching products: ${err}`);
            }
        };
        fetchCart();
    }, []);

    useEffect(() => {
        const fetchBottomProducts = async () => {
            try{
                const result = await axios.get(`${api}/products`);
                setBottomProducts(result.data.slice(0, 4));
            }catch(err){
                console.error(`Error fetching products: ${err}`);
            }
        };
        fetchBottomProducts();
    }, []);

    async function clearCartFunc(){
        try{
            await axios.delete(`${api}/cart/user/${user.id}`);
            clearCart();
        }catch(err){
            console.error(err);
        }
    }

    async function updateQuantity(id, quantity, action){
        try{
            await axios.put(`${api}/cart/${id}`, { quantity });
            setUsercart(prev => prev.map(el => {
                if(el.cart_id === id) return { ...el, quantity }
                return el;
            }));
            if(action === 'increase') addItem(1);
            if(action === 'decrease') removeItem(1);
        }catch(err){
            console.error(err);
        }
    }
    
    async function deleteProduct(id){
        try{
            const item = userCart.find(el => el.cart_id === id);
            await axios.delete(`${api}/cart/${id}`);
            setUsercart(prev => prev.filter(el => el.cart_id === id));
            removeItem(item.quantity);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className={`${theme === 'light' ? 'bg-[#f9f7f5]' : 'bg-[#171311]'} min-h-screen transition-all duration-200`}>
            <Navbar />
            <div className="flex justify-center flex-col px-120 py-30">
                <div className="slide-in-bottom-animation w-full flex justify-between items-center">
                    <div>
                        <h1 
                            className={`
                                ${lang === 'en' ? 'text-3xl' : 'text-2xl'}
                                ${theme === 'light' ? 'text-black' : 'text-white'} 
                                font
                            `}
                            >
                                {lang === 'en' ? 'Your Cart' : 'თქვენი კალათა'}
                        </h1>
                        <p 
                            className={`${lang === 'en' ? 'text-base' : 'text-sm'} text-[#988a7e]`}
                            >
                                {cart === 0 
                                    ? (lang === 'en' ? 'Your cart is empty' : 'თქვენი კალათა ცარიელია')
                                    : (lang === 'en' ? `${cart} items in your cart` : `${cart} ნივთი თქვენს კალათაში`)}
                        </p>
                    </div>
                    {cart > 0 && (
                        <button
                            onClick={clearCartFunc}
                            className={`
                                ${lang === 'en' ? 'text-base' : 'text-sm'}
                                ${theme === 'light' ? 'text-[#dc2869] hover:bg-[#f6e2e0]' : 'text-[#7f1d19] hover:bg-[#221412]'} 
                                flex justify-center items-center gap-1 font-medium rounded px-2 py-1 cursor-pointer transition-all duration-200
                            `}
                            >
                                <TiDeleteOutline size={20} /> {lang === 'en' ? 'Clear All' : 'ყველას წაშლა'}
                        </button>
                    )}
                </div>
                {cart === 0 ? (
                    <div className="h-215 flex justify-between items-center flex-col">
                        <div className="text-[#988a7e] flex justify-center items-center flex-col mt-20">
                            <LuShoppingCart size={50} />
                            <p className="mt-3 text-xl">{lang === 'en' ? 'Nothing in your cart yet.' : 'თქვენს კალათაში ჯერ არაფერია.'}</p>
                            <p className="text-sm mt-1">{lang === 'en' ? 'Explore our collection and find something you love.' : 'დაათვალიერეთ ჩვენი კოლექცია და იპოვეთ ის, რაც მოგწონთ.'}</p>
                            <Link
                                className={`
                                    ${theme === 'light' ? 'bg-[#1c1917] text-white hover:bg-[#312e2d]' : 'bg-[#eeebe8] text-black hover:bg-[#d8d5d2]'}
                                    px-3 py-1.5 font-medium rounded mt-5
                                `}
                                to={'/shop?category=all&stock=true&sort=default'}
                                >
                                    {lang === 'en' ? 'Continue Shopping' : 'შოპინგის გაგრძელება'}
                            </Link>
                        </div>

                        <div>
                            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-2xl mb-5`}>{lang === 'en' ? 'Popular Right Now' : 'ახლა პოპულარულია'}</p>
                            <div className="flex justify-between items-center w-233.5">
                                {bottomProducts.map((el, i) => (
                                    <Link to={`/product/${el.id}`} key={i} className="slide-in-bottom-animation" style={{ animationDelay: `${i * 100}ms` }}>
                                        <img src={el.image} alt={el.name} className="w-50 h-65 rounded" />
                                        <p className="text-[#988a7e] mt-2">{el.category}</p>
                                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} mt-1`}>{el.name}</p>
                                        <p className="text-[#988a7e] mt-1">${el.price}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-start w-full mt-7 text-white">
                        <div className="flex flex-col gap-4">
                            {userCart.map((el, i) => (
                                <div
                                    key={i} 
                                    className={`
                                        ${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} 
                                        slide-in-bottom-animation flex justify-start items-start gap-5 w-150 pl-4 py-3 border rounded
                                    `}
                                    style={{ animationDelay: `${i * 100}ms` }}
                                    >
                                        <img src={el.image} alt={el.name} width={100} onClick={() => navigate(`/product/${el.id}`)} className="rounded cursor-pointer" />
                                        <div className="flex justify-between flex-col h-29">
                                            <div>
                                                <Link to={`/product/${el.id}`} className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium hover:text-[#ce8a3e] transition-all duration-200`}>{el.name}</Link>
                                                <p className="text-[#988a7e] text-sm">{el.category}</p>
                                                <p className="text-[#988a7e] text-xs">${el.price} {lang === 'en' ? 'each' : 'თითო'}</p>
                                            </div>
                                            <div className="flex justify-between items-center w-111.5">
                                                <div className="flex justify-center items-center gap-3">
                                                    <button
                                                        onClick={() => el.quantity > 1 && updateQuantity(el.cart_id, el.quantity - 1, 'decrease')}
                                                        className={`
                                                            ${theme === 'light' ? 'border-[#e5e0dc] text-[#b0aba9] hover:text-[#7a7877]' : 'border-[#38312e] text-[#675e56] hover:text-[#999592]'} 
                                                            border rounded text-xl font-medium w-7 h-7 flex justify-center items-center cursor-pointer transition-all duration-200
                                                        `}
                                                        >
                                                            <FaMinus size={15} />
                                                    </button>
                                                    <span className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{el.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(el.cart_id, el.quantity + 1, 'increase')} 
                                                        className={`
                                                            ${theme === 'light' ? 'border-[#e5e0dc] text-[#b0aba9] hover:text-[#7a7877]' : 'border-[#38312e] text-[#675e56] hover:text-[#999592]'} 
                                                            border rounded text-xl font-medium w-7 h-7 flex justify-center items-center cursor-pointer transition-all duration-200
                                                        `}
                                                        >
                                                            <FaPlus size={15} />
                                                    </button>
                                                </div>
                                                <div className="flex justify-center items-center gap-5">
                                                    <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>${(el.price * el.quantity).toFixed(2)}</p>
                                                    <button
                                                        onClick={() => deleteProduct(el.cart_id)}
                                                        className={`
                                                            ${theme === 'light' ? 'hover:text-[#dc2828]' : 'hover:text-[#7f1d1d]'} 
                                                            text-[#988a7e] cursor-pointer transition-all duration-200
                                                        `}
                                                        >
                                                            <FaRegTrashAlt />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            ))}
                        </div>
                        <div 
                            className={`
                                ${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'}
                                border rounded sticky top-25 p-5 w-72.5
                            `}
                            >
                                <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Order Summary' : 'შეკვეთის შეჯამება'}</h3>
                                <p 
                                    className="text-[#988a7e] mt-4 w-full flex justify-between"
                                    >
                                        {lang === 'en' ? `Subtotal (${cart} items)` : `ჯამი (${cart} ნივთი)`}
                                        <span 
                                            className={`${theme === 'light' ? 'text-black' : 'text-white'}`}
                                            >
                                                ${totalPrice.toFixed(2)}
                                        </span>
                                </p>
                                <p 
                                    className="text-[#988a7e] mt-2 w-full flex justify-between"
                                    >
                                        {lang === 'en' ? 'Shipping' : 'მიწოდება'}
                                        {shippingCost === 0 ? 
                                            (<span className="text-[#29a36a]">{lang === 'en' ? 'Free' : 'უფასო'}</span>) 
                                            :
                                            (<span 
                                                className={`${theme === 'light' ? 'text-black' : 'text-white'}`}
                                                >
                                                    ${shippingCost}
                                            </span>)
                                        }
                                </p>
                                <p className={`${lang === 'en' ? 'text-base' : 'text-sm'} text-[#988a7e] mt-2 w-full flex justify-between`}>{lang === 'en' ? 'Estimated Tax' : 'სავარაუდო გადასახადი'} <span className={`${theme === 'light' ? 'text-black' : 'text-white'} text-base`}>${tax}</span></p>
                                {shippingCost > 0 && (
                                    <p 
                                        className={`
                                            ${lang === 'en' ? 'text-xs' : 'text-[10.5px]'}
                                            ${theme === 'light' ? 'bg-[#f5f2f1]' : 'bg-[#2a2422]'} 
                                            text-[#988a7e] p-2 rounded mt-3
                                        `}
                                        >
                                            {lang === 'en' ? `Add $${(300 - totalPrice).toFixed(2)} more for free shipping` : `დაამატეთ $${(300 - totalPrice).toFixed(2)} უფასო მიწოდებისთვის`}
                                    </p>
                                )}
                                <h2 className={`${theme === 'light' ? 'text-black border-[#e5e0dc]' : 'text-white border-[#38312e]'} font text-xl border-t mt-5 pt-3 w-full flex justify-between`}>{lang === 'en' ? 'Total' : 'ჯამი'} <span>${orderTotal.toFixed(2)}</span></h2>
                                <button 
                                    className={`
                                        ${theme === 'light' ? 'text-white bg-[#1c1917] hover:bg-[#322f2e] ' : 'text-black bg-[#eeebe8] hover:bg-[#d9d6d3]'} 
                                        flex justify-center items-center gap-2 w-full text-sm font-medium mt-5 py-2.5 rounded cursor-pointer transition-all duration-200
                                    `}
                                    >
                                        <GoLock size={20} /> {lang === 'en' ? 'Secure Checkout' : 'შეკვეთის განთავსება'}
                                </button>
                                <button
                                    onClick={() => navigate('/shop?category=all&stock=true&sort=default')}
                                    className={`
                                        ${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black hover:text-white' : 'bg-[#171311] border-[#38312e]'} 
                                        w-full border rounded mt-3 py-2 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200
                                    `}
                                    >
                                        {lang === 'en' ? 'Continue Shopping' : 'შოპინგის გაგრძელება'}
                                </button>
                                <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} border-t mt-5`}>
                                    <p className="flex justify-start items-center gap-2 text-[#988a7e] text-xs mt-2.5"><FiCreditCard /> {lang === 'en' ? 'Secure 256-bit SSL payment' : 'დაცული 256-bit SSL გადახდა'}</p>
                                    <p className="flex justify-start items-center gap-2 text-[#988a7e] text-xs mt-2"><LuTruck /> {lang === 'en' ? '1-3 business day delivery' : 'მიწოდება 1-3 სამუშაო დღეში'}</p>
                                    <p className="flex justify-start items-center gap-2 text-[#988a7e] text-xs mt-2"><FaArrowRotateLeft /> {lang === 'en' ? '30-day hassle-free returns' : '30-დღიანი უპრობლემო დაბრუნება'}</p>
                                </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}