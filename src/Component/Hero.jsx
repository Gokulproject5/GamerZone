import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect, useRef, useState } from "react";
import { ProductApi } from "../ProductApi/ProductApi";
import Slider from "react-slick";
import { Card } from "./Card";
import Footer from "./Footer";
import Notification from "./Notification";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import supabase from "../data/supabaseClient";

const Hero = () => {
    const { products, setNewProduct, newProduct, setOpen } = useContext(ProductApi);
    const sliderRef = useRef(null);
    const navigate = useNavigate();
 
        const [allGames, setAllGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
   

    useEffect(() => {
        const fetchGames = async () => {
            try {
                // 1. Fetch Games from Supabase
                const { data, error } = await supabase
                    .from('games')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) setAllGames(data);

            } catch (err) {
                console.error("Initialization Error:", err.message);
            } finally {
                // ALWAYS turn off loading, even if fetch fails
                setLoading(false);
            }
        };

        fetchGames();

        // Safety Timeout: Force close loading screen after 5 seconds 
        // to prevent users being stuck on a black screen
        const timer = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    // Filter Logic
    const filteredGames = allGames.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

   
    const next = () => sliderRef.current?.slickNext();
    const previous = () => sliderRef.current?.slickPrev();

    // --- SYNCED BUY NOW LOGIC ---
    const handleBuyNow = async (game) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("Please login to purchase games!");
            navigate('/Login');
            return;
        }

        const isExist = newProduct.find(item => item.id === game.id);

        if (isExist) {
            const newQty = (isExist.quantity || 1) + 1;
            setNewProduct(newProduct.map(item => 
                item.id === game.id ? { ...item, quantity: newQty } : item
            ));
            await supabase.from('cart').update({ quantity: newQty }).eq('user_id', user.id).eq('game_id', game.id);
        } else {
            const { error } = await supabase.from('cart').insert({ user_id: user.id, game_id: game.id, quantity: 1 });
            if (!error) {
                setNewProduct([...newProduct, { ...game, quantity: 1 }]);
            }
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

    // --- FIX: Loading check must be BEFORE the return ---
    if (!products || products.length === 0) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-green-500 text-2xl font-bold animate-pulse">
                    Loading Gamer Zone...
                </div>
            </div>
        );
    }

    return (
        <main className="bg-gray-950 min-h-screen text-white overflow-hidden">
            <section className="mx-auto md:py-10 md:px-4">
                <Notification />

                {/* Banner Slider */}
                <div className="relative mx-auto max-w-7xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-gray-800 group">
                    
                    {/* Navigation */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button onClick={previous} className="bg-black/40 hover:bg-green-600 backdrop-blur-md flex items-center justify-center w-14 h-14 rounded-full border border-white/10 text-2xl"><FaAngleLeft /></button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button onClick={next} className="bg-black/40 hover:bg-green-600 backdrop-blur-md flex items-center justify-center w-14 h-14 rounded-full border border-white/10 text-2xl"><FaAngleRight /></button>
                    </div>

                    <Slider ref={sliderRef} {...settings}>
                        {products.slice(0, 6).map((item, index) => (
                            <div key={item.id || index} className="relative h-[500px] md:h-[600px] outline-none">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover brightness-[0.5] transition-transform duration-[5000ms] hover:scale-110"
                                />
                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 bg-gradient-to-t from-gray-950 via-transparent to-transparent">
                                    <div className="max-w-2xl">
                                        <span className="bg-green-600 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest shadow-lg">Featured Game</span>
                                        <h2 className="text-3xl md:text-6xl font-black mt-4 leading-none uppercase italic">{item.title}</h2>
                                        <div className="flex items-center gap-4 mt-6 bg-black/40 w-fit p-3 rounded-xl backdrop-blur-md border border-white/10">
                                            <p className="text-gray-300 font-bold text-sm uppercase">{item.genre}</p>
                                            <div className="flex items-center gap-3 border-l border-gray-700 pl-4">
                                                <p className="text-gray-500 line-through text-sm">₹{item.price}</p>
                                                <p className="text-green-400 font-black text-2xl">₹{item.finalPrice}</p>
                                                <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-black">-{item.discount}%</span>
                                            </div>
                                        </div>
                                        <button onClick={() => handleBuyNow(item)} className="mt-8 bg-green-600 text-white px-12 py-4 rounded-2xl font-black uppercase hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="py-20 max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                            <span className="w-2 h-8 bg-green-500 rounded-full"></span> Trending Now
                        </h3>
                        <div className="h-[1px] flex-1 bg-gray-800 ml-10"></div>
                    </div>
                    <Card />
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default Hero;
