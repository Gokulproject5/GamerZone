import React, { useContext } from 'react'
import { ProductApi } from '../ProductApi/ProductApi'
import { BiCart, BiCartAdd } from 'react-icons/bi';
import { BsCart, BsCart3 } from 'react-icons/bs';
import { CiCircleCheck } from 'react-icons/ci';
import { FaCircleCheck } from 'react-icons/fa6';

const Card = () => {
    const { products, setNewProduct, newProduct } = useContext(ProductApi);

    const handleAdd = (product) => {

        const isAlreadyInCart = newProduct.some(item => item.id === product.id);

        if (!isAlreadyInCart) {
            setNewProduct([...newProduct, product]);
        }
    };

    return (
        <div className='grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  sm:gap-3 space-y-5 mx-auto  py-5 bg-gray-90 text-white'>
            {products.map((product) => {

                const isInCart = newProduct.some(item => item.id === product.id);

                return (
                    <div className='bg-slate-800 rounded-md w-52 mx-auto overflow-hidden shadow-xl ' key={product.id}>
                        <div className='w-full h-48'>
                            <img
                                src={product.image}
                                alt={product.title}
                                className='w-full h-full object-fit'
                            />
                        </div>

                        <div className='p-4 space-y-4'>
                            <div className='h-10 '>
                                <h1 className={`font-bold leading-tight line-clamp-2 ${product.title.length > 14 ? "text-sm" : "text-md"}`}>
                                    {product.title}
                                </h1>
                                <p className='text-[10px] mt-1 capitalize text-gray-400 space-x-1.5'>
                                    Genre: <span className='text-green-500 font-bold'>{product.genre}</span>
                                </p>
                            </div>

                            <div className='flex items-center space-x-2'>
                                <span className='text-xs line-through text-red-500'>₹{product.price}</span>
                                <span className='text-lg font-bold text-white'>₹{product.finalPrice ==0?"Free":product.finalPrice }</span>
                            </div>

                            <button
                                onClick={() => handleAdd(product)}
                                disabled={isInCart}
                                className={`w-full py-2 px-4 rounded text-xs font-bold transition-all ${isInCart
                                    ? "bg-green-400 cursor-not-allowed "
                                    : "bg-green-600 hover:bg-green-500 active:scale-95 cursor-pointer"
                                    } text-white`}
                            >
                                {isInCart ? <span className='flex gap-2 text-white items-center '><FaCircleCheck className='text-lg'/>Added</span> : <span className='flex items-center gap-2'><BsCart3 className='text-lg font-bold'/>ADD TO CART</span>}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Card
