import { useContext, useState, } from 'react'
import { ProductApi } from '../ProductApi/ProductApi'
import { BsCart3, BsCheckCircle } from 'react-icons/bs';
import { FaCircleCheck } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';


export const Card = () => {
    const { products, setNewProduct, newProduct } = useContext(ProductApi);
    const [flyingProduct, setFlyingProduct] = useState(null);

    const handleAdd = (product, e) => {
        const isAlreadyInCart = newProduct.some(item => item.id === product.id);

        if (!isAlreadyInCart) {

            const rect = e.currentTarget.closest('.product-card').getBoundingClientRect();

            setNewProduct([...newProduct, product]);
            setFlyingProduct({
                id: product.id,
                image: product.image,
                top: rect.top,
                left: rect.left
            });

            setTimeout(() => setFlyingProduct(null), 900);
        }
    };

    return (
        <div className='grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 bg-white rounded sm:gap-3 space-y-5 mx-auto py-5 text-white'>
            {products.map((product) => {
                const isInCart = newProduct.some(item => item.id === product.id);
                const isFlying = flyingProduct?.id === product.id;

                return (
                    <div className='product-card bg-slate-800 rounded-md w-52 mx-auto overflow-hidden shadow-xl relative' key={product.id}>
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
                                        top: 30,
                                        left: '84.5%',
                                        width: '20px',
                                        height: '20px',
                                        opacity: 0.5,
                                        borderRadius: '50%'
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
                                />
                            )}
                        </AnimatePresence>
                        <div className='p-4 space-y-4'>
                            <div className=' '>
                                <h1 className={`font-bold leading-tight line-clamp-2 ${product.title.length > 14 ? "text-sm" : "text-md"}`}>
                                    {product.title}
                                </h1>
                                <p className='text-[10px] mt-1 capitalize text-gray-400 space-x-1.5'>
                                    Genre: <span className='text-green-500 font-bold'>{product.genre}</span>
                                </p>

                            </div>

                            <div className='flex items-center space-x-2'>
                                <span className='text-xs line-through text-red-500'>₹{product.price}</span>
                                <span className='text-lg font-bold text-white'>₹{product.finalPrice == 0 ? "Free" : product.finalPrice}</span>
                            </div>

                            <button
                                onClick={(e) => handleAdd(product, e)}
                                disabled={isInCart}
                                className={`w-full py-2 px-4 rounded text-xs font-bold transition-all ${isInCart
                                    ? "bg-gray-400 cursor-not-allowed "
                                    : "bg-green-600 hover:bg-green-500 active:scale-95 cursor-pointer"
                                    } text-white`}
                            >
                                {isInCart ? <span className='flex gap-2 text-white items-center '><FaCircleCheck className='text-lg' />Added</span> : <span className='flex items-center gap-2'><BsCart3 className='text-lg font-bold' />ADD TO CART</span>}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
