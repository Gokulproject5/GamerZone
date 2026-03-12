import { useContext, useEffect, useState } from 'react';
import { ProductApi } from '../ProductApi/ProductApi';
import { BsCart3 } from 'react-icons/bs';
import { FaCircleCheck } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../data/supabaseClient';

export const Card = () => {
    const { setNewProduct, newProduct } = useContext(ProductApi);
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flyingProduct, setFlyingProduct] = useState(null);

    // 1. Fetch Games from Supabase
    useEffect(() => {
        const getGames = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('games').select();
            if (!error) setProduct(data);
            setLoading(false);
        };
        getGames();
    }, []);

    // 2. Handle Add to Cart (Fixed for 409 Conflict and Event Null errors)
    const handleAdd = async (product, e) => {
        // FIX 1: Capture DOM elements IMMEDIATELY before any 'await' 
        // This prevents the "Cannot read properties of null (reading 'closest')" error
        const cardElement = e.currentTarget.closest('.product-card');
        const rect = cardElement?.getBoundingClientRect();

        // FIX 2: Check local state first to prevent unnecessary DB calls
        const isAlreadyInCart = newProduct.some(item => item.id === product.id);
        if (isAlreadyInCart) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("Please login to add items to cart!");
            return;
        }

        // 3. Sync with Supabase
        const { error } = await supabase
            .from('cart')
            .insert({ 
                user_id: user.id, 
                game_id: product.id, 
                quantity: 1 
            });

        if (error) {
            // Error code 23505 is a unique constraint violation (already in cart)
            if (error.code !== '23505') {
                console.error("Error adding to DB:", error.message);
                return;
            }
        }

        // 4. Update UI & Run Animation
        setNewProduct([...newProduct, { ...product, quantity: 1 }]);
        
        if (rect) {
            setFlyingProduct({
                id: product.id,
                image: product.image,
                top: rect.top,
                left: rect.left
            });
            setTimeout(() => setFlyingProduct(null), 900);
        }
    };

    if (loading) {
        return <div className='text-green-500 text-center text-2xl animate-pulse py-20'>Loading Gamer Zone...</div>;
    }

    return (
        <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 bg-white rounded gap-4 mx-auto py-5 px-2 text-white'>
            {products.map((product) => {
                const isInCart = newProduct.some(item => item.id === product.id);
                const isFlying = flyingProduct?.id === product.id;

                return (
                    <div className='product-card bg-slate-800 rounded-md w-full max-w-[208px] mx-auto overflow-hidden shadow-xl relative' key={product.id}>
                        <div className='w-full h-48'>
                            <img src={product.image} alt={product.title} className='w-full h-full object-cover' />
                        </div>

                        {/* Cart animation */}
                        <AnimatePresence>
                            {isFlying && (
                                <motion.img
                                    src={flyingProduct.image}
                                    initial={{
                                        position: 'fixed',
                                        top: flyingProduct.top,
                                        left: flyingProduct.left,
                                        width: '180px',
                                        zIndex: 9999,
                                        opacity: 1,
                                        borderRadius: '8px'
                                    }}
                                    animate={{
                                        top: 20,
                                        left: '85%',
                                        width: '25px',
                                        height: '25px',
                                        opacity: 0.2,
                                        borderRadius: '50%'
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
                                />
                            )}
                        </AnimatePresence>

                        <div className='p-4 space-y-4'>
                            <div>
                                <h1 className={`font-bold leading-tight line-clamp-2 ${product.title.length > 14 ? "text-sm" : "text-md"}`}>
                                    {product.title}
                                </h1>
                                <p className='text-[10px] mt-1 capitalize text-gray-400'>
                                    Genre: <span className='text-green-500 font-bold ml-1'>{product.genre}</span>
                                </p>
                            </div>

                            <div className='flex items-center space-x-2'>
                                <span className='text-xs line-through text-red-500'>₹{product.price}</span>
                                <span className='text-lg font-bold text-white'>
                                    {product.finalPrice === 0 ? "Free" : `₹${product.finalPrice}`}
                                </span>
                            </div>

                            <button
                                onClick={(e) => handleAdd(product, e)}
                                disabled={isInCart}
                                className={`w-full py-2 px-4 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                                    isInCart
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-500 active:scale-95 cursor-pointer"
                                } text-white`}
                            >
                                {isInCart ? (
                                    <> <FaCircleCheck className='text-lg' /> Added </>
                                ) : (
                                    <> <BsCart3 className='text-lg font-bold' /> ADD TO CART </>
                                )}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
