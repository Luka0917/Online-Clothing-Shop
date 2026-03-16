import { useState, useEffect } from "react";
import { useStore, api } from "../store/store";
import { Link, useParams } from 'react-router';
import useInView from "../hooks/useInView";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoCheckmarkOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { LuTruck } from "react-icons/lu";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { LuShield } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

export default function ProductDetails(){
    const { theme, lang, addItem, user } = useStore();
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [bottomProducts, setBottomProducts] = useState([]);
    const [sizes, setSizes] = useState([
        {size: 'XS', chosen: false},
        {size: 'S', chosen: false},
        {size: 'M', chosen: true},
        {size: 'L', chosen: false},
        {size: 'XL', chosen: false},
    ]);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const { ref: productImageRef, inView: productImageInView } = useInView();
    const { ref: productDetailsRef, inView: productDetailsInView } = useInView();
    const { ref: productDetailsInfoRef, inView: productDetailsInfoInView } = useInView();
    const { ref: reviewsRef, inView: reviewsInView } = useInView();
    const { ref: youMayAlsoLikeref, inView: youMayAlsoLikeInView } = useInView();

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                const result = await axios.get(`${api}/products/id/${id}`);
                setProduct(result.data);
            }catch(err){
                console.error(`Error fetching products: ${err}`);
            }
        };
        fetchProduct();
    }, [id]);

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

    async function addItemToCart(){
        if(!user){
            navigate('/auth');
            return;
        }
        try{
            await axios.post(`${api}/cart`, { user_id: user.id, product_id: id, quantity });
            addItem(quantity);
        }catch(err){
            console.error(err);
        }
    }

    const reviews = [
        {
            text: "Absolutely stunning quality. The fabric feels incredible and the fit is perfect.",
            user: "Alice M.",
            date: "Jan 2026"
        },
        {
            text: "Beautiful piece, runs slightly large. I'd recommend sizing down if you're between sizes.",
            user: "David K.",
            date: "Dec 2025"
        },
        {
            text: "Arrived quickly and beautifully packaged. This has become my favourite piece in my wardrobe.",
            user: "Sophie L.",
            date: "Feb 2026"
        }
    ]
    
    return (
        <div className={`${theme === 'light' ? 'bg-[#f9f7f5]' : 'bg-[#171311]'} min-h-screen transition-all duration-200 text-white`}>
            <Navbar />
            <div className="flex justify-center flex-col px-70 py-30">
                <div className="text-sm text-[#988a7e] flex gap-2.5">
                    <Link to={'/'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} transition-all duration-200`}>Home</Link>
                    /
                    <Link to={'/shop'} className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} transition-all duration-200`}>Shop</Link>
                    /
                    <Link
                        to={`/shop?category=${product.category}&stock=true&sort=default`} 
                        className={`${theme === 'light' ? 'hover:text-black' : 'hover:text-white'} transition-all duration-200`}
                        >
                            {product.category
                                ? product.category?.charAt(0).toUpperCase() + product.category?.slice(1)
                                : ''
                            }
                    </Link>
                    /
                    <span className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{product.name}</span>
                </div>

                <div className="flex justify-between items-center mt-10">
                    <img ref={productImageRef} src={product.image} alt={product.name} className={`${productImageInView ? 'slide-in-left-animation' : 'opacity-0'} w-170 h-185 rounded`} />
                    <div ref={productDetailsRef} className={`${productDetailsInView ? 'slide-in-right-animation' : 'opacity-0'}`}>
                        <p className="tracking-[10px] text-sm text-[#988a7e]">{product.category?.toUpperCase()}</p>
                        <h2 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-4xl font-bold mt-2`}>{product.name}</h2>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-2xl font-semibold mt-3`}>${product.price}</p>
                        <p className="text-[#988a7e] w-140 mt-5">{product.description}</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} text-lg font-medium mt-5`}>Size</p>
                        <div className="flex items-center gap-5 mt-2">
                            {sizes.map((el, i) => (
                                <div 
                                    key={i}
                                    onClick={() => setSizes(prev => 
                                        prev.map(i => ({
                                            ...i,
                                            chosen: i.size === el.size
                                        }))
                                    )}
                                    className={`
                                        ${el.chosen && 'bg-[#ce8a3e] text-white'}
                                        ${theme === 'light' ? 'border-[#e5e0dc] hover:border-black hover:text-black' : 'border-[#38312e] hover:border-white hover:text-white'}
                                        text-[#988a7e] border w-10 h-10 flex justify-center items-center rounded cursor-pointer transition-all duration-200
                                    `}>
                                    {el.size}
                                </div>
                            ))}
                        </div>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} text-lg font-medium mt-5`}>Quantity</p>
                        <div className="flex items-center gap-5 mt-2">
                            <button 
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
                                className={`
                                    ${theme === 'light' ? 'hover:text-black border-[#e5e0dc]' : 'hover:text-white border-[#38312e]'}
                                    text-2xl text-[#988a7e] border w-9 h-9 flex justify-center items-center rounded cursor-pointer transition-all duration-200
                                `}
                                >
                                    -
                            </button>
                            <span className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{quantity}</span>
                            <button 
                                onClick={() => setQuantity(prev => prev + 1)} 
                                className={`
                                    ${theme === 'light' ? 'hover:text-black border-[#e5e0dc]' : 'hover:text-white border-[#38312e]'}
                                    text-2xl text-[#988a7e] border w-9 h-9 flex justify-center items-center rounded cursor-pointer transition-all duration-200
                                `}
                                >
                                    +
                            </button>
                        </div>
                        {
                            product.stock > 0 ? 
                                <p className={`${theme === 'light' ? 'text-[#44a877]' : 'text-[#279a62]'} flex items-center gap-2 mt-5`}><IoCheckmarkOutline /> In Stock — Ships in 1-3 business days</p> 
                                :
                                <p className={`${theme === 'light' ? 'text-[#dd4243]' : 'text-[#751c1c]'} flex items-center gap-2 mt-5`}>Out of Stock — Notify me when available</p>
                        }
                        <button
                            onClick={addItemToCart}
                            className={`
                                ${theme === 'light' ? 'bg-[#1c1917] text-white hover:bg-[#312e2d]' : 'bg-[#eeebe8] text-black hover:bg-[#d8d5d2]'}
                                flex justify-center items-center gap-5 w-140 rounded py-3 mt-5 cursor-pointer transition-all duration-200
                            `}
                            >
                                <LuShoppingCart size={20} /> Add to Cart - ${(product.price * quantity).toFixed(2)}
                        </button>
                        <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} border-t mt-10 pt-5 flex flex-col gap-2.5`}>
                            <p className="flex items-center gap-3 text-sm text-[#988a7e]"><LuTruck /> Free shipping on orders over $300</p>
                            <p className="flex items-center gap-3 text-sm text-[#988a7e]"><FaArrowRotateLeft /> 30-day free returns & exchanges</p>
                            <p className="flex items-center gap-3 text-sm text-[#988a7e]"><LuShield /> 2-year quality guarantee</p>
                        </div>
                    </div>
                </div>

                <div ref={productDetailsInfoRef} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} flex justify-between mt-20 pt-10 border-t`}>
                    <div className={`${productDetailsInfoInView ? 'slide-in-bottom-animation' : 'opacity-0'}`}>
                        <h4 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>Materials</h4>
                        <p className="text-[#988a7e] w-107 mt-3">Crafted from premium, responsibly sourced materials. Each piece is selected for durability, comfort, and timeless appeal.</p>
                        <ul className="list-disc list-inside text-[#988a7e] mt-2">
                            <li>Ethically sourced fabrics</li>
                            <li>OEKO-TEX® certified</li>
                            <li>Biodegradable packaging</li>
                        </ul>
                    </div>
                    <div className={`${productDetailsInfoInView ? 'slide-in-bottom-animation' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
                        <h4 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>Care Instructions</h4>
                        <p className="text-[#988a7e] w-87 mt-3">Proper care ensures your garment lasts for years.</p>
                        <ul className="list-disc list-inside text-[#988a7e] mt-2">
                            <li>Dry clean recommended</li>
                            <li>Store on padded hangers</li>
                            <li>Avoid direct sunlight</li>
                            <li>Iron on low heat</li>
                            <li>Do not bleach</li>
                        </ul>
                    </div>
                    <div className={`${productDetailsInfoInView ? 'slide-in-bottom-animation' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
                        <h4 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>Sizing & Fit</h4>
                        <p className="text-[#988a7e] w-80 mt-3">True to size. Model is 5'11" and wears size M.</p>
                        <ul className="list-disc list-inside text-[#988a7e] mt-2">
                            <li>XS: Chest 34-36"</li>
                            <li>S: Chest 36-38"</li>
                            <li>M: Chest 38-40"</li>
                            <li>L: Chest 40-42"</li>
                            <li>XL: Chest 42-44"</li>
                        </ul>
                    </div>
                </div>
                <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} mt-20 pt-13 border-t`}>
                    <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-2xl mb-8`}>Customer Reviews</h3>
                    <div ref={reviewsRef} className="flex justify-between items-center">
                        {reviews.map((el, i) => (
                            <div 
                                key={i} 
                                className={`
                                    ${reviewsInView ? 'slide-in-bottom-animation' : 'opacity-0'}
                                    ${theme === 'light' ? 'border-[#e5e0dc] bg-[#fdfcfc]' : 'border-[#38312e] bg-[#221d1b]'} 
                                    flex flex-col border rounded px-5 py-3
                                `}
                                style={{ animationDelay: `${i * 100}ms` }}
                                >
                                <div className="flex gap-1 text-[#ce8a3e]">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                                <p className="text-sm w-89 text-[#988a7e] mt-2.5">"{el.text}"</p>
                                <div className="flex justify-between items-center mt-3">
                                    <p className={`${theme === 'light' ? 'text-black' : 'text-white'} text-sm`}>{el.user}</p>
                                    <p className="text-xs text-[#988a7e]">{el.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-25">
                    <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-2xl mb-8`}>You May Also Like</h3>
                    <div ref={youMayAlsoLikeref} className="flex justify-between">
                        {bottomProducts.map((el, i) => (
                            <Link 
                                to={`/product/${el.id}`} 
                                key={el.id} 
                                className={`${youMayAlsoLikeInView ? 'slide-in-bottom-animation' : 'opacity-0'}`} 
                                style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    <img src={el.image} alt={el.name} className="w-75 h-90 rounded" />
                                    <p className="text-[#988a7e] mt-2">{el.category}</p>
                                    <p className={`${theme === 'light' ? 'text-black' : 'text-white'} mt-1`}>{el.name}</p>
                                    <p className="text-[#988a7e] mt-1">${el.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>                
            </div>
            <Footer />
        </div>
    )
}