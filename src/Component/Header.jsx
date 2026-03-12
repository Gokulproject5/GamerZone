import React, { useContext, useEffect, useState } from 'react';
import { FaGamepad } from 'react-icons/fa';
import { PiShoppingCartSimple, PiShoppingCartSimpleFill } from 'react-icons/pi';
import { ProductApi } from '../ProductApi/ProductApi';
import { LuSearch, LuLogOut, LuUser } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router';
import supabase from '../data/supabaseClient';

const Header = () => {
    const { setOpen, open, newProduct, setNewProduct } = useContext(ProductApi);
    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Memoized total count for performance
    const totalItemsCount = newProduct.reduce((acc, item) => acc + (item.quantity || 1), 0);

    useEffect(() => {
        // 1. Check initial session
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        getInitialSession();

        // 2. Listen for ALL Auth changes (Login, Logout, Session Expired)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            
            // SECURITY: If signed out, wipe the local cart state immediately
            if (event === 'SIGNED_OUT') {
                setNewProduct([]);
                setOpen(false); // Close cart if open
                navigate('/Login');
            }
        });

        return () => subscription.unsubscribe();
    }, [setNewProduct, setOpen, navigate]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Error logging out:", error.message);
    };

    return (
        <header className='sticky top-0 z-50 shadow-sm bg-white backdrop-blur-md border-b border-gray-100'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3 h-20'>

                {/* LOGO */}
                <Link to="/" className='flex items-center gap-2 group'>
                    <div className='p-2 rounded-xl bg-green-50 group-hover:bg-green-600 transition-all duration-300'>
                        <FaGamepad className='text-3xl text-green-600 group-hover:text-white' />
                    </div>
                    <h1 className='font-black text-gray-900 text-xl tracking-tighter uppercase hidden sm:block'>
                        Gamer <span className='text-green-600 text-2xl'>Zone</span>
                    </h1>
                </Link>

                {/* SEARCH BAR */}
                <div className='flex-1 max-w-md mx-4 relative'>
                    <div className='flex items-center bg-gray-100 rounded-full px-4 py-2.5 border-2 border-transparent focus-within:border-green-500 focus-within:bg-white transition-all shadow-inner'>
                        <LuSearch className='text-gray-400 group-focus-within:text-green-600' />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full outline-none bg-transparent text-sm font-medium text-gray-800 px-3' 
                            placeholder='Search your favorite games...' 
                        />
                    </div>
                </div>

                {/* NAV ACTIONS */}
                <nav className='flex items-center gap-3 md:gap-5'>
                    
                    {/* CART BUTTON */}
                    <button 
                        onClick={() => setOpen(!open)}
                        className='relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors active:scale-95'
                    >
                        <PiShoppingCartSimple className='text-2xl text-gray-700' />
                        {totalItemsCount > 0 && (
                            <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-black flex justify-center items-center border-2 border-white animate-in zoom-in'>
                                {totalItemsCount}
                            </span>
                        )}
                    </button>

                    {/* AUTH PROFILE / LOGIN */}
                    {user ? (
                        <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
                            <Link to={'/Dashboard'} 
                                title={user.email}
                                className='h-10 w-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shadow-md cursor-help border-2 border-white outline outline-1 outline-green-600'
                            >
                                {user.email.charAt(0).toUpperCase()}
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors group"
                                title="Logout"
                            >
                                <LuLogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ) : (
                        <Link 
                            to='/Login' 
                            className='flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-green-600 transition-all shadow-lg active:scale-95'
                        >
                            <LuUser size={18} />
                            <span>Sign In</span>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
