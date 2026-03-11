import React, { useContext, useState } from 'react';
import { FaGamepad } from 'react-icons/fa';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { ProductApi } from '../ProductApi/ProductApi';
import { LuSearch } from 'react-icons/lu';

const Header = () => {
    const { setOpen, open, newProduct } = useContext(ProductApi);
    const [searchTerm, setSearchTerm] = useState("");

    // Calculate total quantity of all items 
    const totalItemsCount = newProduct.reduce((acc, item) => acc + (item.quantity || 1), 0);

    return (
        <header className='sticky top-0 z-50 shadow-md bg-white border-b border-gray-100'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3 md:h-25'>

                {/* Brand LOGO */}
                <div className='flex items-center cursor-pointer group gap-2'>
                    <div className='p-2 rounded-xl bg-gray-100 group-hover:bg-green-600 transition-colors duration-300'>
                        <FaGamepad className='text-3xl md:text-4xl text-green-600 group-hover:text-white transition-colors' />
                    </div>
                    <h1 className='font-black  text-gray-900 text-[13px] sm:text-xl md:text-2xl tracking-tighter uppercase   sm:block'>
                        Gamer <span className=' logo sm:text-3xl '>Zone</span>
                    </h1>
                </div>

                {/* Search Bar */}
                <div className='md:flex-1 flex-1 md:max-w-md mx-2 sm:mx-4 md:mx-10 relative group'>
                    <div className='flex items-center bg-gray-100 rounded-full px-2 py-1 md:px-4 md:py-2.5 border-2 border-transparent focus-within:border-green-500 focus-within:bg-white transition-all shadow-inner'>
                        <LuSearch className='text-xl text-green-600 md:text-gray-400 group-focus-within:text-green-600' />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full outline-none bg-transparent text-sm  sm:block font-medium text-gray-800 px-3 placeholder:text-gray-400' 
                            placeholder='Search your favorite games...' 
                        />
                    </div>
                </div>

                {/* Cart & Navigation */}
                <nav className='flex items-center gap-2 space-x-2'>
                    <div className='relative'>
                     
                        {totalItemsCount > 0 && (
                            <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-black flex justify-center items-center z-20 shadow-lg border-2 border-white '>
                                {totalItemsCount}
                            </span>
                        )}

                        <button
                            onClick={() => setOpen(!open)}
                            className='relative p-2.5 rounded-xl hover:bg-green-600 group transition-all duration-300 active:scale-90 overflow-hidden'
                        >
                            <PiShoppingCartSimpleFill
                                className='text-2xl text-green-800 group-hover:text-white transition-colors'
                            />
                        </button>
                    </div>
                    <div title='Gokul' className='border-2 hover:scale-105 hover:bg-gray-50 shadow-inner shadow-gray-100 border-green-500 h-8 w-8 text-green-600 rounded-full text-center py-1'>
                         <a target='_blank' href='https://github.com/Gokulproject5/'>G</a>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
