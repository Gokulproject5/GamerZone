import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useRef } from "react";
import { ProductApi } from "../ProductApi/ProductApi";
import Slider from "react-slick";
import Card from "./Card";
import Footer from "./Footer";

const Hero = () => {
    
    const { products, setNewProduct, newProduct, setOpen } = useContext(ProductApi);
   
    let sliderRef = useRef(null);

    const next = () => sliderRef.current?.slickNext();
const previous = () => sliderRef.current?.slickPrev();


    
    const handleBuyNow = (game) => {
        const isExist = newProduct.find(item => item.id === game.id);
        if (isExist) {
            setNewProduct(newProduct.map(item => 
                item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setNewProduct([...newProduct, { ...game, quantity: 1 }]);
        }
        setOpen(true); 
    };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
    fade: true,
    dotsClass: "slick-dots custom-dots", 
};


   

    return (
        <main className="bg-gray-950 min-h-screen text-white overflow-hidden">
            <section className="mx-auto py-10 px-4">

                {/* Banner Slider */}
                <div className="relative mx-auto max-w-7xl rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-800 group">
                    
                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                        <button 
                            onClick={previous} 
                            className="bg-black/40 hover:bg-green-600 backdrop-blur-md w-14 h-14 rounded-full border border-white/10 text-2xl transition-all"
                        >
                            {"<"}
                        </button>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-x-2">
                        <button 
                            onClick={next} 
                            className="bg-black/40 hover:bg-green-600 backdrop-blur-md w-14 h-14 rounded-full border border-white/10 text-2xl transition-all"
                        >
                            {">"}
                        </button>
                    </div>

                    <Slider ref={sliderRef} {...settings}>
                        {products.slice(0, 5).map((item, index) => (
                            <div key={index} className="relative h-[500px] md:h-[600px] outline-none group/slide">
                               
                                {/* Image  */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-fill brightness-[0.6] transition-transform duration-[10000] scale-100 group-active/slide:scale-110"
                                    style={{ transform: 'scale(1.1)' }} 
                                />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 h-160 bg-gradient-to-t from-gray-950 via-transparent to-transparent">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="bg-green-600 text-[10px] font-black px-4 py-1.5 rounded-md uppercase tracking-[3px] shadow-lg shadow-green-900/20">
                                            Featured Title
                                        </span>
                                        <h2 className="text-4xl  font-black mt-4 drop-shadow-2xl  uppercase tracking-tighter">
                                            {item.title}
                                        </h2>
                                        
                                        <div className="flex items-center gap-4 mt-4 bg-black/30 w-fit p-2 rounded-lg backdrop-blur-sm border border-white/5">
                                            <p className="text-gray-300 font-bold text-sm uppercase tracking-widest">{item.genre}</p>
                                            <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
                                                <p className="text-gray-500 line-through text-sm">₹{item.price}</p>
                                                <p className="text-green-400 font-black text-2xl">₹{item.finalPrice}</p>
                                                <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-sm font-black">
                                                    SAVE {item.discount}%
                                                </span>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => handleBuyNow(item)}
                                            className="mt-8 bg-green-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(22,163,74,0.3)]"
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Trending Section */}
                <div className="py-20 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                            <span className="w-3 h-10 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e]"></span>
                            Trending Now
                        </h3>
                        <div className="h-[1px] flex-1 bg-gray-800 ml-10 hidden md:block"></div>
                    </div>
                    <Card />
                </div>
               
            </section>
             <Footer />
        </main>
    );
};

export default Hero;
