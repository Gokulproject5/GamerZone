import React, { useContext, useEffect, useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { ProductApi } from '../ProductApi/ProductApi'

const Notification = () => {
    const { newProduct } = useContext(ProductApi)
    const [alert, setAlert] = useState(false)
    const [lastItem, setLastItem] = useState("")

    useEffect(() => {
        // Only trigger if a NEW item was added (checks the last item in the array)
        if (newProduct.length > 0) {
            const latest = newProduct[newProduct.length - 1];
            setLastItem(latest.title);
            setAlert(true);

            const timer = setTimeout(() => {
                setAlert(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [newProduct.length]) // Triggers only when the COUNT changes

    return (
        <div className={`
            ${alert ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} 
            fixed top-24 right-6 transition-all duration-500 ease-out
            flex z-[200] items-center gap-4 py-4 px-6 
            bg-black text-white rounded-[2rem] shadow-2xl shadow-black/20
        `}>
            {/* Minimalist Icon and Dynamic Text */}
            <div className='bg-green-500 p-2 rounded-full'>
                <BsFillCheckCircleFill size={16} className='text-black' />
            </div>
            <div className='flex flex-col'>
                <p className='text-[10px] font-black uppercase tracking-widest text-gray-400'>Cart Updated</p>
                <h1 className='text-xs font-bold italic truncate w-32'>
                    {lastItem || "Item"} Added
                </h1>
            </div>
        </div>
    )
}

export default Notification
