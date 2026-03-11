import React, { useContext, useState } from 'react'
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa'
import { ProductApi } from '../ProductApi/ProductApi'
import { LuPlus, LuShoppingCart, LuTrash2, LuMinus } from 'react-icons/lu'
import { IoBagRemoveSharp, IoRemove, IoRemoveCircle } from 'react-icons/io5';
import { MdPersonRemoveAlt1, MdRemoveShoppingCart } from 'react-icons/md';


export const Cart = () => {
    const { open, setOpen, newProduct, setNewProduct } = useContext(ProductApi);
    const [show, setShow] = useState(true);
   
    const handleShow = () => setShow(!show);
    
    
    const totalPrice = newProduct.reduce((acc, item) => {
        return acc + (item.finalPrice * (item.quantity || 1));
    }, 0);

    
    const totalItemsCount = newProduct.reduce((acc, item) => acc + (item.quantity || 1), 0);

    const handleDelete = (id) => {
        const itemToDecrement = newProduct.find(item => item.id === id);
        if (!itemToDecrement) return;

        if (itemToDecrement.quantity > 1) {
            setNewProduct(newProduct.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ));
        } else {
           
            setNewProduct(newProduct.filter(item => item.id !== id));
        }
    };

    const handleAdd = (id) => {
        setNewProduct(newProduct.map(item =>
            item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        ));
    };

   const handleRemove=()=>{
   setNewProduct([])
    }

    //  Payment gateway 
    const handlePayment =(totalprice)=>{
          if (typeof window.Razorpay === 'undefined') {
        alert("Razorpay failed to load. Check your internet connection.");
        return;
    }
        var option = {
        key:"rzp_test_SPuGoebdfYwF11",
        key_secret:"FJHbFmDWPDwHpWsqo8qJWuAa",
        amount:totalprice *100,
        currency:"INR",
        name:"Gamer_Zone",
        description:"for Testing",
        handler:function(response){
            alert(`Payment Successfull Payement id:${response.razorpay_payment_id}`
                
            );
        },
        prefill:{
            name:"Gamer_zone",
            email:"agokul110@gmail.com",
            contact:"8608093474",
        },notes:{
            address:"Razorpay Corporate office"
        },
        theme:{
            color:"#128a24"
        }

    };
    var pay = new window.Razorpay(option);
    pay.open();
  
    
  }
    if (!open) return null; 

    return (
        <aside className='fixed inset-0 z-[120]'>
            {/* Backdrop */}
            <title>My Cart | Gamer Zone</title>
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' onClick={() => setOpen(false)}></div>

            <div className='fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl flex flex-col'>
                {/* Header */}
                <div className='border-b border-gray-100 p-5 flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        <FaAngleLeft 
                            onClick={() => setOpen(false)}
                            className="cursor-pointer hover:bg-gray-100 p-2 text-4xl rounded-full text-green-700 transition-all" 
                        />
                        <h1 className='text-xl font-bold text-gray-800'>My Cart</h1>
                    </div>
                    <span className='text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full'>
                        {newProduct.length} Games
                    </span>
                    {
                      newProduct.length >0 &&   <span onClick={handleRemove} className='bg-red-400 text-white px-2 py-2 rounded text-xs flex items-center '><MdRemoveShoppingCart className='text-lg' />Remove All</span>
  
                    }
                </div>

                {/* Total Bar */}
                <div onClick={handleShow} className="mx-4 my-3 cursor-pointer rounded-xl bg-gray-50 p-4 flex justify-between items-center border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div className='flex items-center space-x-3 text-gray-700'>
                        <LuShoppingCart size={20} />
                        {show ? <FaAngleUp /> : <FaAngleDown />} 
                        <span className='text-xs font-bold text-gray-500 uppercase tracking-tight'>
                            {totalItemsCount} Total Items
                        </span>
                    </div>
                    <span className='text-lg font-black text-gray-900'>₹{totalPrice.toLocaleString()}</span>
                </div>

                {/* Items List */}
                <div className={`flex-1 px-4 py-2 space-y-3 overflow-y-auto custom-scrollbar transition-all ${show ? "opacity-100" : "opacity-0"}`}>
                    {newProduct.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <LuShoppingCart size={48} className="mb-4 opacity-20" />
                            <p className="font-medium">Your cart is feeling light!</p>
                        </div>
                    ) : (
                        newProduct.map((product) => (
                            <div key={product.id} className='flex items-center justify-between rounded-2xl bg-green-700 p-3 shadow-md hover:shadow-lg transition-shadow border border-green-600'>
                                <div className='flex items-center space-x-3'>
                                    <div className='bg-white p-1 rounded-xl shrink-0 shadow-inner'>
                                        <img src={product.image} className='w-14 h-14 rounded-lg object-fill' alt={product.title} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <h1 className='text-white text-[13px] font-bold w-28 line-clamp-1 leading-tight'>{product.title}</h1>
                                        <p className='text-[11px] mt-1 font-bold text-green-100 italic'>
                                            ₹{product.finalPrice} × {product.quantity}
                                        </p>
                                    </div>
                                </div>

                                {/* Counter Controls */}
                                <div className='flex items-center space-x-2 bg-white/20 p-1.5 rounded-full backdrop-blur-sm border border-white/10'>
                                    <button 
                                        onClick={() => handleDelete(product.id)} 
                                        className='bg-white text-gray-600 rounded-full w-7 h-7 flex justify-center items-center hover:text-red-600 active:scale-90 transition-all'
                                    >
                                         {product.quantity > 1 ? <LuMinus size={14} /> : <LuTrash2 size={14} />}
                                    </button>
                                    <span className='text-white font-black text-sm px-1 min-w-[20px] text-center'>{product.quantity}</span>
                                    <button 
                                        onClick={() => handleAdd(product.id)} 
                                        className='bg-white text-green-800 rounded-full w-7 h-7 flex justify-center items-center hover:bg-green-100 active:scale-90 transition-all'
                                    >
                                        <LuPlus size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                   
                {/* Footer / Checkout */}
                <div role='button' tabIndex={0} onClick={()=>handlePayment(totalPrice)} className='border-t  border-gray-100 bg-white p-6'>
                    <button 
                        disabled={newProduct.length === 0}
                        className='w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white rounded-2xl p-4 flex justify-between items-center shadow-xl active:scale-[0.98] transition-all group'
                    >
                        <div className='text-left'>
                            <p className='text-[10px] uppercase opacity-70 font-black tracking-widest'>Total Payable</p>
                            <h1 className='text-xl font-black'>₹{totalPrice.toLocaleString()}</h1>
                        </div>
                        <div className='flex items-center font-bold text-lg'>
                            Place Order 
                            <FaAngleRight className='ml-2 text-2xl group-hover:translate-x-1 transition-transform' />
                        </div>
                    </button>
                </div>
                
            </div>
           
        </aside>
    );
};
