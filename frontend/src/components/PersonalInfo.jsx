import { useState, useEffect, useId } from 'react';
import { useStore, api } from '../store/store';
import axios from 'axios';
import { FiEdit2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { LuSave } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

export default function PersonalInfo(){
    const { theme, lang, user, setUser } = useStore();
    const [refresh, setRefresh] = useState(false);

    const [editUser, setEditUser] = useState(false);
    const [fullName, setFullName] = useState(user.full_name);
    const [email, setEmail] = useState(user.email);
    const [orders, setOrders] = useState([]);

    const [addresses, setAddresses] = useState([]);
    const [addAddress, setAddAddress] = useState(false);
    const [editAddress, setEditAddress] = useState(null);

    const labelId = useId();
    const streetAddressId = useId();
    const cityId = useId();
    const stateId = useId();
    const ZIPCodeId = useId();
    const countryId = useId();

    const editLabelId = useId();
    const editStreetAddressId = useId();
    const editCityId = useId();
    const editStateId = useId();
    const editZIPCodeId = useId();
    const editCountryId = useId();

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const result = await axios.get(`${api}/orders/${user.id}`);
                setOrders(result.data);
            }catch(err){
                console.error(`Error fetching orders: ${err}`);
            }
        }
        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchAddresses = async () => {
            try{
                const result = await axios.get(`${api}/address/${user.id}`);
                setAddresses(result.data);
            }catch(err){
                console.error(`Error fetching addresses: ${err}`);
            }
        }
        fetchAddresses();
    }, [refresh]);

    async function updateUserInfo(){
        try{
            const result = await axios.put(`${api}/users/${user.id}`, { full_name: fullName, email });
            setUser(result.data.user);
            setEditUser(false);
            setRefresh(prev => !prev);
        }catch(err){
            console.error(err);
            alert(err.response?.data?.message);
        }
    }

    async function handleAddressForm(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const label = formData.get('label');
        const street_address = formData.get('streetAddress');
        const city = formData.get('city');
        const state = formData.get('state');
        const ZIP_code = formData.get('zipCode');
        const country = formData.get('country');

        try{
            await axios.post(`${api}/address/${user.id}`, { label, street_address, city, state, ZIP_code, country });
            setAddAddress(false);
            setRefresh(prev => !prev);
        }catch(err){
            console.error(err);
            alert(err.response?.data?.message);
        }
    }

    async function deleteAddress(id){
        try{
            await axios.delete(`${api}/address/${id}`);
            setRefresh(prev => !prev);
        }catch(err){
            console.error(err);
        }
    }

    async function setAddressDefault(id){
        try{
            await axios.patch(`${api}/address/${id}/default`, { user_id: user.id });
            setRefresh(prev => !prev);
        }catch(err){
            console.error(err);
        }
    }

    async function handleChangeAddress(e, id){
        e.preventDefault();

        const formData = new FormData(e.target);
        const label = formData.get('label');
        const street_address = formData.get('streetAddress');
        const city = formData.get('city');
        const state = formData.get('state');
        const ZIP_code = formData.get('zipCode');
        const country = formData.get('country');

        try{
            const result = await axios.put(`${api}/address/${id}`, { label, street_address, city, state, ZIP_code, country });
            setAddresses(result.data.address);
            setEditAddress(null);
            setRefresh(prev => !prev);
        }catch(err){
            console.error(err);
            alert(err.response?.data?.message);
        }
    }

    return (
        <div className='slide-in-bottom-animation'>
            <div className='flex justify-between items-center'>
                <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Personal Information' : 'პირადი ინფორმაცია'}</p>
                {editUser ? (
                    <div className='slide-in-right-animation flex justify-center items-center gap-2'>
                        <button 
                            onClick={() => setEditUser(prev => !prev)} 
                            className={`
                                ${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200
                            `}
                            >
                                <RxCross2 size={20} /> {lang === 'en' ? 'Cancel' : 'გაუქმება'}
                        </button>
                        <button
                            onClick={updateUserInfo}
                            className={`
                                ${theme === 'light' ? 'bg-[#1c1917] text-white hover:bg-[#312e2d]' : 'bg-[#eeebe8] text-black hover:bg-[#d8d5d2]'}
                                flex justify-center items-center gap-2 rounded px-3 py-1 cursor-pointer transition-all duration-200
                            `}
                            >
                                <LuSave /> {lang === 'en' ? 'Save' : 'შენახვა'}
                        </button>
                    </div>
                ) : <button onClick={() => setEditUser(prev => !prev)} className={`${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200`}><FiEdit2 /> {lang === 'en' ? 'Edit' : 'რედაქტირება'}</button>}
            </div>
            <div className={`${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} flex justify-center items-center flex-col border rounded-xl px-6 py-7.5 mt-7`}>
                <div className='flex justify-between items-center gap-5 w-full'>
                    <div className='w-1/2'>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'FULL NAME' : 'სრული სახელი'}</p>
                        {editUser ? 
                            <input type='text' value={fullName} onChange={e => setFullName(e.target.value)} id='fullName' className={`${theme === 'light' ? 'bg-[#f9f7f5] text-black border-[#e5e0dc]' : 'bg-[#171311] text-white border-[#38312e]'} w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#ce8a3e] mt-1 px-2 py-1`} />
                            :
                            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{user.full_name}</p>}
                    </div>
                    <div className='w-1/2'>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'EMAIL' : 'ელ. ფოსტა'}</p>
                        {editUser ? 
                            <input type='text' value={email} onChange={e => setEmail(e.target.value)} id='email' className={`${theme === 'light' ? 'bg-[#f9f7f5] text-black border-[#e5e0dc]' : 'bg-[#171311] text-white border-[#38312e]'} w-full border rounded focus:outline-none focus:ring-2 focus:ring-[#ce8a3e] mt-1 px-2 py-1`} />
                            :
                            <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{user.email}</p>
                        }
                    </div>
                </div>
                <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : ' border-[#38312e]'} flex justify-between items-center gap-5 w-full border-t mt-5 pt-5`}>
                    <div className='w-1/2'>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'MEMBER SINCE' : 'წევრი -დან'}</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className='w-1/2'>
                        <p className='text-[#988a7e] text-sm'>{lang === 'en' ? 'TOTAL ORDERS' : 'შეკვეთები'}</p>
                        <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium mt-1`}>{orders.length}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex justify-between items-center mt-5'>
                    <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-xl`}>{lang === 'en' ? 'Saved Addresses' : 'შენახული მისამართები'}</p>
                    <button onClick={() => setAddAddress(true)} className={`${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200`}><FaPlus /> {lang === 'en' ? 'Add Address' : 'მისამართის დამატება'}</button>
                </div>
                {addAddress && (
                    <form onSubmit={handleAddressForm} className={`${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} slide-in-bottom-animation border rounded-xl mt-3 px-5 py-6`}>
                        <div className='flex justify-center flex-col'>
                            <label htmlFor={labelId} className='text-[#988a7e]'>{lang === 'en' ? 'LABEL (OPTIONAL)' : 'ეტიკეტი (არასავალდებულო)'}</label>
                            <input type="text" name='label' autoComplete="off" placeholder={lang === 'en' ? 'e.g. Home, Work' : 'მაგ. სახლი, სამსახური'} id={labelId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                        </div>

                        <div className='flex justify-center flex-col'>
                            <label htmlFor={streetAddressId} className='text-[#988a7e] mt-5'>{lang === 'en' ? 'STREET ADDRESS' : 'ქუჩის მისამართი'} *</label>
                            <input type="text" name='streetAddress' autoComplete="street-address" placeholder={lang === 'en' ? '123 Main St' : 'მეინ სტრიტი 123'} id={streetAddressId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                        </div>

                        <div>
                            <div className='flex justify-between items-center gap-5 mt-5 w-full'>
                                <div className='w-1/2 flex flex-col'>
                                    <label htmlFor={cityId} className='text-[#988a7e]'>{lang === 'en' ? 'CITY' : 'ქალაქი'} *</label>
                                    <input type="text" name='city' autoComplete="address-level2" placeholder={lang === 'en' ? 'City' : 'ქალაქი'} id={cityId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                </div>
                                <div className='w-1/2 flex flex-col'>
                                    <label htmlFor={stateId} className='text-[#988a7e]'>{lang === 'en' ? 'STATE' : 'შტატი'}</label>
                                    <input type="text" name='state' autoComplete="address-level1" placeholder={lang === 'en' ? 'State' : 'შტატი'} id={stateId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-5 mt-5 w-full'>
                                <div className='w-1/2 flex flex-col'>
                                    <label htmlFor={ZIPCodeId} className='text-[#988a7e]'>ZIP {lang === 'en' ? 'CODE' : 'კოდი'} *</label>
                                    <input type="text" name='zipCode' autoComplete="postal-code" placeholder='12345' min={0} maxLength={5} pattern="[0-9]*" inputMode='numeric' id={ZIPCodeId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                </div>
                                <div className='w-1/2 flex flex-col'>
                                    <label htmlFor={countryId} className='text-[#988a7e]'>{lang === 'en' ? 'COUNTRY' : 'ქვეყანა'} *</label>
                                    <input type="text" name='country' autoComplete="country-name" placeholder={lang === 'en' ? 'Country' : 'ქვეყანა'} id={countryId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-start items-center gap-2 mt-5'>
                            <button
                                className={`
                                    ${theme === 'light' ? 'bg-[#1c1917] text-white hover:bg-[#312e2d]' : 'bg-[#eeebe8] text-black hover:bg-[#d8d5d2]'}
                                    flex justify-center items-center gap-2 rounded px-3 py-1 cursor-pointer transition-all duration-200
                                `}
                                >
                                    <LuSave /> {lang === 'en' ? 'Save' : 'შენახვა'}
                            </button>
                            <button 
                                onClick={() => setAddAddress(prev => !prev)} 
                                className={`
                                    ${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200
                                `}
                                >
                                    <RxCross2 size={20} /> {lang === 'en' ? 'Cancel' : 'გაუქმება'}
                            </button>
                        </div>
                    </form>
                )}
                {addresses.length > 0 ? (
                    <div className='mt-5 flex justify-center items-center flex-col gap-3'>
                        {addresses.map((el, i) => (
                            editAddress === el.id ? (
                                <form key={i} onSubmit={e => handleChangeAddress(e, el.id)} className={`${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} slide-in-bottom-animation border rounded-xl p-4 w-full`}>
                                    <div className='flex justify-center flex-col'>
                                        <label htmlFor={editLabelId} className='text-[#988a7e]'>{lang === 'en' ? 'LABEL (OPTIONAL)' : 'ეტიკეტი (არასავალდებულო)'}</label>
                                        <input type="text" name='label' autoComplete="off" defaultValue={el.label} placeholder={lang === 'en' ? 'e.g. Home, Work' : 'მაგ. სახლი, სამსახური'} id={editLabelId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                    </div>

                                    <div className='flex justify-center flex-col'>
                                        <label htmlFor={editStreetAddressId} className='text-[#988a7e] mt-5'>{lang === 'en' ? 'STREET ADDRESS' : 'ქუჩის მისამართი'} *</label>
                                        <input type="text" name='streetAddress' autoComplete="street-address" defaultValue={el.street_address} placeholder={lang === 'en' ? '123 Main St' : 'მეინ სტრიტი 123'} id={editStreetAddressId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                    </div>

                                    <div>
                                        <div className='flex justify-between items-center gap-5 mt-5 w-full'>
                                            <div className='w-1/2 flex flex-col'>
                                                <label htmlFor={editCityId} className='text-[#988a7e]'>{lang === 'en' ? 'CITY' : 'ქალაქი'} *</label>
                                                <input type="text" name='city' autoComplete="address-level2" defaultValue={el.city} placeholder={lang === 'en' ? 'City' : 'ქალაქი'} id={editCityId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                            </div>
                                            <div className='w-1/2 flex flex-col'>
                                                <label htmlFor={editStateId} className='text-[#988a7e]'>{lang === 'en' ? 'STATE' : 'შტატი'}</label>
                                                <input type="text" name='state' autoComplete="address-level1" defaultValue={el.state} placeholder={lang === 'en' ? 'State' : 'შტატი'} id={editStateId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center gap-5 mt-5 w-full'>
                                            <div className='w-1/2 flex flex-col'>
                                                <label htmlFor={editZIPCodeId} className='text-[#988a7e]'>ZIP {lang === 'en' ? 'CODE' : 'კოდი'} *</label>
                                                <input type="text" name='zipCode' autoComplete="postal-code" defaultValue={el.ZIP_code} placeholder='12345' min={0} maxLength={5} pattern="[0-9]*" inputMode='numeric' id={editZIPCodeId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                            </div>
                                            <div className='w-1/2 flex flex-col'>
                                                <label htmlFor={editCountryId} className='text-[#988a7e]'>{lang === 'en' ? 'COUNTRY' : 'ქვეყანა'} *</label>
                                                <input type="text" name='country' autoComplete="country-name" defaultValue={el.country} placeholder={lang === 'en' ? 'Country' : 'ქვეყანა'} id={editCountryId} className={`${theme === 'light' ? 'bg-[#f9f7f5] border-[#e5e0dc] text-black' : 'bg-[#171311] border-[#38312e] text-white'} placeholder:text-[#988a7e] border rounded px-3 py-1.5 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#ce8a3e]`} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-start items-center gap-2 mt-5'>
                                        <button
                                            className={`
                                                ${theme === 'light' ? 'bg-[#1c1917] text-white hover:bg-[#312e2d]' : 'bg-[#eeebe8] text-black hover:bg-[#d8d5d2]'}
                                                flex justify-center items-center gap-2 rounded px-3 py-1 cursor-pointer transition-all duration-200
                                            `}
                                            >
                                                <LuSave /> {lang === 'en' ? 'Save' : 'შენახვა'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditAddress(null)}
                                            className={`
                                                ${theme === 'light' ? 'text-black border-[#e5e0dc] hover:text-white' : 'text-white border-[#38312e]'} 
                                                flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] cursor-pointer transition-all duration-200
                                            `}
                                            >
                                                <RxCross2 size={20} /> {lang === 'en' ? 'Cancel' : 'გაუქმება'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div 
                                    key={i} 
                                    className={`
                                        ${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} 
                                        slide-in-bottom-animation border rounded-xl p-4 w-full flex justify-between items-center
                                    `}
                                    style={{ animationDelay: `${i * 100}ms` }}
                                    >
                                        <div className='flex justify-center items-center gap-3'>
                                            <div className={`${theme === 'light' ? 'bg-[#f1f0ee]' : 'bg-[#322c29]'} text-[#988a7e] w-10 h-10 rounded-lg flex justify-center items-center`}><LuMapPin size={18} /></div>
                                            <div className='flex flex-col'>
                                                <div className='flex items-center gap-2'>
                                                    <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font-medium`}>{el.label}</p>
                                                    {el.is_default === 1 && <span className={`${theme === 'light' ? 'border-[#e5e0dc] text-black' : 'border-[#38312e] text-white'} border rounded-xl text-[11px] font-medium px-2`}>{lang === 'en' ? 'Default' : 'ძირითადი'}</span>}
                                                </div>
                                                <span className='text-xs text-[#988a7e]'>{el.street_address}, {el.city}, {el.state}, {el.ZIP_code}, {el.country}</span>
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center gap-2'>
                                            {el.is_default === 0 && 
                                                <button onClick={() => setAddressDefault(el.id)} className={`${theme === 'light' ? 'text-black' : 'text-white'} hover:bg-[#ce8a3e] hover:text-white py-1.75 px-2.5 rounded text-sm cursor-pointer transition-all duration-200`}>{lang === 'en' ? 'Set Default' : 'ძირითადად დაყენება'}</button>
                                            }
                                            <button onClick={() => setEditAddress(el.id)} className={`${theme === 'light' ? 'text-black' : 'text-white'} hover:bg-[#ce8a3e] hover:text-white p-1.75 rounded cursor-pointer transition-all duration-200`}><FiEdit2 /></button>
                                            <button onClick={() => deleteAddress(el.id)} className={`${theme === 'light' ? 'text-[#dc2828]' : 'text-[#7f1d1d]'} hover:bg-[#ce8a3e] hover:text-white p-1.75 rounded cursor-pointer transition-all duration-200`}><FaRegTrashAlt /></button>
                                        </div>
                                </div>
                            )
                        ))}
                    </div>
                ) : (
                    !addAddress && (
                        <div className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} slide-in-bottom-animation border border-dashed rounded-xl flex justify-center items-center flex-col py-10 mt-3 text-[#988a7e]`}>
                            <LuMapPin size={25} />
                            <p className='my-2'>{lang === 'en' ? 'No saved addresses yet.' : 'მისამართები ჯერ არ არის შენახული.'}</p>
                            <button onClick={() => setAddAddress(true)} className={`${theme === 'light' ? 'border-[#e5e0dc]' : 'border-[#38312e]'} flex justify-center items-center gap-2 border rounded px-3 py-1 hover:bg-[#ce8a3e] hover:text-white cursor-pointer transition-all duration-200`}>{lang === 'en' ? 'Add Address' : 'მისამართის დამატება'}</button>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}