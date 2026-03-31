import { useState, useEffect } from "react";
import { useStore, api } from "../store/store";
import axios from 'axios';
import { Link } from 'react-router';
import { useSearchParams } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GiSettingsKnobs } from "react-icons/gi";

export default function Shop(){
    const { theme, lang } = useStore();

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get('category') || 'all';
    const stockFromUrl = searchParams.get('stock') === 'true';
    const sortFromUrl = searchParams.get('sort') || '';

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
    const [inStockOnly, setInStockOnly] = useState(stockFromUrl);
    const [sortOption, setSortOption] = useState(sortFromUrl);
    const [searchQuery, setSearchQuery] = useState('');
    const categories = ["all", "outwear", "knitwear", "shirts", "bottoms", "accessories", "footwear"];

    useEffect(() => {
        setSelectedCategory(searchParams.get('category') || 'all');
        setInStockOnly(searchParams.get('stock') === 'true');
        setSortOption(searchParams.get('sort') || '');
    }, [searchParams]);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const result = await axios.get(`${api}/products`);
                setProducts(result.data);
            }catch(err){
                console.error(`Error fetching products: ${err}`);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(el => {
        if(selectedCategory !== 'all' && el.category !== selectedCategory) return false;
        if(inStockOnly && el.stock <= 0) return false;
        if(searchQuery && !el.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    }).sort((a, b) => {
        switch(sortOption) {
            case 'priceLow':
                return a.price - b.price;
            case 'priceHigh':
                return b.price - a.price;
            case 'nameAZ':
                return a.name.localeCompare(b.name);
            case 'nameZA':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    return (
        <div className={`${theme === 'light' ? 'bg-[#f9f7f5]' : 'bg-[#171311]'} min-h-screen transition-all duration-200`}>
            <Navbar page='shop' />
            <div className="slide-in-bottom-animation flex justify-center flex-col pl-70 pt-30">
                <h2 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-4xl`}>{lang === 'en' ? 'Shop' : 'პროდუქტები'}</h2>
                <p className="text-[#988a7e] w-100 text-sm mt-2">{lang === 'en' ? 'Browse our complete collection of 20 timeless essentials, crafted for the modern wardrobe.' : 'დაათვალიერეთ ჩვენი სრული კოლექცია, რომელიც შედგება 20 ნივთისგან, რომლებიც შექმნილია თანამედროვე გარდერობისთვის.'}</p>
                <input 
                    type="text" 
                    placeholder={lang === 'en' ? 'Search products...' : 'მოიძიეთ პროდუქტები...'}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className={`${theme === 'light' ? 'border-[#e5e0dc] text-black' : 'border-[#38312e] text-white'} w-90 mt-5 border rounded py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e] placeholder:text-[#988a7e]`}
                />
            </div>
            <div className="flex justify-between items-center px-70 mt-20">
                <div className="flex justify-center items-center gap-3">
                    {categories.map((el, i) => (
                        <button
                            key={i}
                            onClick={() => 
                                setSearchParams({
                                    category: el,
                                    stock: inStockOnly,
                                    sort: sortOption || 'default'
                                })
                            }
                            className={`
                                ${selectedCategory === el ? 'bg-[#ce8a3e] text-white' : theme === 'light' ? 'bg-[#f1f0ee] text-black' : 'bg-[#322c29] text-white'}
                                px-4 py-1 rounded cursor-pointer
                            `}
                        >
                            {el.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div className="flex justify-center items-center gap-3">
                    <button 
                        onClick={() => 
                            setSearchParams({
                                category: selectedCategory,
                                stock: !inStockOnly,
                                sort: sortOption || 'default'
                            })
                        }
                        className={`
                            ${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'}
                            ${inStockOnly && 'bg-[#ce8a3e] text-white'}
                            flex justify-center items-center gap-2 border rounded py-1 px-4 cursor-pointer hover:bg-[#ce8a3e] transition-all duration-200
                        `}
                        >
                            <GiSettingsKnobs size={18} /> In Stock Only
                    </button>
                    <select 
                        value={sortOption}
                        onChange={e => 
                            setSearchParams({
                                category: selectedCategory,
                                stock: inStockOnly,
                                sort: e.target.value || 'default'
                            })
                        }
                        className={`
                            ${theme === 'light' ? 'text-black border-[#e5e0dc]' : 'text-white border-[#38312e]'}
                            border py-1 px-2 rounded
                        `}
                        >
                        <option value="" className="text-black">Default</option>
                        <option value="priceLow" className="text-black">Price: Low - Hight</option>
                        <option value="priceHigh" className="text-black">Price: hight - Low</option>
                        <option value="nameAZ" className="text-black">Name: A - Z</option>
                        <option value="nameZA" className="text-black">Name: Z - A</option>
                    </select>
                </div>
            </div>
            <p className="text-xs text-[#988a7e] pl-70 mt-10">{lang === 'en' ? `Showing ${filteredProducts.length} of ${products.length} products` : `ნაჩვენებია ${products.length}-დან ${filteredProducts.length} პროდუქტი`}</p>
            <div id="shop-page-products">
                {filteredProducts.map((el, i) => (
                    <Link
                        key={i}
                        to={`/product/${el.id}`}
                        className='slide-in-bottom-animation flex justify-center flex-col rounded'
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <img src={el.image} alt={el.name} className="w-75 h-95 rounded" />
                        <p className="text-sm text-[#988a7e] uppercase mt-2">{el.category}</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{el.name}</p>
                        <p className="text-[#988a7e]">${el.price}</p>
                    </Link>
                ))}
            </div>
            <Footer />
        </div>
    )
}