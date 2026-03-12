import React, { useContext, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { ProductApi } from '../ProductApi/ProductApi';
import { LuPlus, LuShoppingCart, LuTrash2, LuMinus } from 'react-icons/lu';
import { MdRemoveShoppingCart } from 'react-icons/md';
import supabase from '../data/supabaseClient';

export const Cart = () => {
    const { open, setOpen, newProduct, setNewProduct } = useContext(ProductApi);

    const totalPrice = newProduct.reduce((acc, item) => acc + (item.finalPrice * (item.quantity || 1)), 0);
    const totalItemsCount = newProduct.reduce((acc, item) => acc + (item.quantity || 1), 0);

    const handleAdd = async (id) => {
        const newQty = (newProduct.find(i => i.id === id).quantity || 1) + 1;
        setNewProduct(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i));
        const { data: { user } } = await supabase.auth.getUser();
        if (user) await supabase.from('cart').update({ quantity: newQty }).eq('user_id', user.id).eq('game_id', id);
    };

    const handleDelete = async (id) => {
        const item = newProduct.find(i => i.id === id);
        const { data: { user } } = await supabase.auth.getUser();
        if (item.quantity > 1) {
            const newQty = item.quantity - 1;
            setNewProduct(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i));
            if (user) await supabase.from('cart').update({ quantity: newQty }).eq('user_id', user.id).eq('game_id', id);
        } else {
            setNewProduct(prev => prev.filter(i => i.id !== id));
            if (user) await supabase.from('cart').delete().eq('user_id', user.id).eq('game_id', id);
        }
    };

    const handlePayment = (totalAmount) => {
        if (!window.Razorpay) return alert("Razorpay SDK not found.");
        const options = {
            key: "rzp_test_SPuGoebdfYwF11",
            amount: totalAmount * 100,
            currency: "INR",
            name: "Gamer Zone",
            handler: async function (response) {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const libraryItems = newProduct.map(item => ({ user_id: user.id, game_id: item.id }));
                    const { error } = await supabase.from('owned_games').insert(libraryItems);
                    if (!error) {
                        await supabase.from('cart').delete().eq('user_id', user.id);
                        setNewProduct([]);
                        setOpen(false);
                        alert("Purchase Successful!");
                    } else {
                        alert("Sync Error: " + error.message);
                    }
                }
            },
            theme: { color: "#000000" }
        };
        new window.Razorpay(options).open();
    };

    if (!open) return null;

    return (
        <aside className='fixed inset-0 z-[150] flex justify-end font-sans antialiased'>
            {/* Background Overlay */}
            <div className='absolute inset-0 bg-black/40 backdrop-blur-[2px]' onClick={() => setOpen(false)}></div>
            
            {/* Cart Surface */}
            <div className='relative h-full w-full sm:w-[400px] bg-white flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.1)] transition-all'>
                
                {/* Header: Clean & No Borders */}
                <div className='p-8 flex justify-between items-center bg-white'>
                    <div className='flex items-center gap-4'>
                        <div onClick={() => setOpen(false)} className="p-2 hover:bg-gray-50 rounded-full cursor-pointer transition-colors text-black">
                            <FaAngleLeft size={24} />
                        </div>
                        <h2 className='font-black text-2xl tracking-tighter uppercase italic'>Cart</h2>
                    </div>
                    {newProduct.length > 0 && (
                        <button onClick={() => setNewProduct([])} className='text-red-500 hover:text-red-600 transition-colors p-2'>
                            <MdRemoveShoppingCart size={20} />
                        </button>
                    )}
                </div>

                {/* Items List: Clean Floating Cards */}
                <div className='flex-1 overflow-y-auto px-6 py-2 space-y-6'>
                    {newProduct.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-300">
                            <LuShoppingCart size={64} className="mb-4 opacity-20" />
                            <p className="font-bold tracking-tighter uppercase italic">Empty</p>
                        </div>
                    ) : (
                        newProduct.map(product => (
                            <div key={product.id} className='group flex items-center justify-between p-2 rounded-[2rem] hover:bg-gray-50 transition-all'>
                                <div className='flex items-center gap-4'>
                                    <div className="relative shadow-lg shadow-gray-200 rounded-2xl overflow-hidden">
                                        <img src={product.image} className='w-16 h-16 object-cover bg-gray-100' alt={product.title} />
                                    </div>
                                    <div>
                                        <h4 className='text-sm font-black text-black leading-tight w-32 truncate uppercase tracking-tighter'>{product.title}</h4>
                                        <p className='text-xs font-bold text-green-500 mt-1'>₹{product.finalPrice.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Minimal Quantity Controls */}
                                <div className='flex items-center gap-3 bg-black text-white p-1 rounded-full'>
                                    <button onClick={() => handleDelete(product.id)} className='w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors'>
                                        {product.quantity > 1 ? <LuMinus size={14}/> : <LuTrash2 size={14}/>}
                                    </button>
                                    <span className='text-xs font-black w-4 text-center'>{product.quantity || 1}</span>
                                    <button onClick={() => handleAdd(product.id)} className='w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors'>
                                        <LuPlus size={14}/>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Surface */}
                <div className='p-8 bg-white'>
                    <div className='flex items-end justify-between mb-8 px-2'>
                        <div>
                            <p className='text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1'>Total Balance</p>
                            <p className='text-xs font-bold text-gray-400'>{totalItemsCount} Digital Assets</p>
                        </div>
                        <span className='font-black text-3xl tracking-tighter'>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    
                    <button 
                        onClick={() => handlePayment(totalPrice)} 
                        disabled={newProduct.length === 0}
                        className='w-full py-6 bg-black text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-green-500 hover:text-black transition-all duration-300 disabled:bg-gray-100 disabled:text-gray-300 shadow-xl shadow-black/5 active:scale-95'
                    >
                        Process Payment
                    </button>
                </div>
            </div>
        </aside>
    );
};
