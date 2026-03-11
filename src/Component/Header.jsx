import React, { useContext, useState } from 'react';
import { FaGamepad } from 'react-icons/fa';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { ProductApi } from '../ProductApi/ProductApi';
import { LuSearch } from 'react-icons/lu';

const Header = () => {
    const { setOpen, open, newProduct } = useContext(ProductApi);
    const [searchTerm, setSearchTerm] = useState("");

    // Calculate total quantity of all items for the badge
    const totalItemsCount = newProduct.reduce((acc, item) => acc + (item.quantity || 1), 0);

    return (
        <header className='sticky top-0 z-50 shadow-md bg-white border-b border-gray-100'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3'>

                {/* Brand LOGO */}
                <div className='flex items-center cursor-pointer group gap-2'>
                    <div className='p-2 rounded-xl bg-green-50 group-hover:bg-green-600 transition-colors duration-300'>
                        <FaGamepad className='text-3xl md:text-4xl text-green-600 group-hover:text-white transition-colors' />
                    </div>
                    <h1 className='font-black text-xl md:text-2xl tracking-tighter uppercase italic hidden sm:block'>
                        Gamer <span className='text-gray-900'>Zone</span>
                    </h1>
                </div>

                {/* Search Bar - Improved styling */}
                <div className='flex-1 max-w-md mx-4 md:mx-10 relative group'>
                    <div className='flex items-center bg-gray-100 rounded-2xl px-4 py-2 border border-transparent focus-within:border-green-500 focus-within:bg-white transition-all shadow-inner'>
                        <LuSearch className='text-xl text-gray-400 group-focus-within:text-green-600' />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full outline-none bg-transparent text-sm font-medium text-gray-800 px-3 placeholder:text-gray-400' 
                            placeholder='Search your favorite games...' 
                        />
                    </div>
                </div>

                {/* Cart & Navigation */}
                <nav className='flex items-center gap-2'>
                    <div className='relative'>
                        {/* Improved Cart Badge */}
                        {totalItemsCount > 0 && (
                            <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-black flex justify-center items-center z-20 shadow-lg border-2 border-white '>
                                {totalItemsCount}
                            </span>
                        )}

                        <button
                            onClick={() => setOpen(!open)}
                            className='relative p-2.5 rounded-xl bg-gray-100 hover:bg-green-600 group transition-all duration-300 active:scale-90 overflow-hidden'
                        >
                            <PiShoppingCartSimpleFill
                                className='text-2xl text-green-800 group-hover:text-white transition-colors'
                            />
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
