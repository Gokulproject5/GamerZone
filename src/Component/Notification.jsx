import React, { useContext, useEffect, useState } from 'react'
import { BiCheckCircle } from 'react-icons/bi'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { ProductApi } from '../ProductApi/ProductApi'

const Notification = () => {
    const { newProduct } = useContext(ProductApi)
    const [alert, setAlert] = useState(false)
    useEffect(() => {

        if (newProduct.length>0) {
            setAlert(true);

            const timer = setTimeout(() => {
                setAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [
        newProduct
    ])
    return (
        <>
            <div className={`
    ${alert ? "translate-x-0 opacity-100" : "translate-x-full  opacity-0"} 
    fixed top-20 right-5 transition-all duration-500 ease-in-out
    flex text-sm z-50 items-center py-3 px-4 
    bg-white rounded-lg shadow-xl shadow-gray-950 text-green-600
`}>
                <h1 className='flex items-center gap-2'><BsFillCheckCircleFill />Item Added into Cart</h1>
            </div>
        </>
    )
}

export default Notification