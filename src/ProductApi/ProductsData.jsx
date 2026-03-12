// src/ProductApi/ProductsData.jsx
import { useState, useEffect } from "react";
import { ProductApi } from "./ProductApi";
import supabase from "../data/supabaseClient";

const ProductsData = ({ children }) => {
    const [products, setProducts] = useState([]); 
    const [newProduct, setNewProduct] = useState([]);
    const [open, setOpen] = useState(false);

    // --- 1. FUNCTION: Sync Database Cart to React State ---
    const fetchUserCart = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            // Fetch cart and JOIN with games table to get titles/images
            const { data, error } = await supabase
                .from('cart')
                .select(`
                    quantity,
                    games (*)
                `)
                .eq('user_id', user.id);

            if (!error && data) {
                // Format the joined data to match your 'newProduct' structure
                const formattedCart = data.map(item => ({
                    ...item.games,
                    quantity: item.quantity
                }));
                setNewProduct(formattedCart);
            }
        }
    };

    useEffect(() => {
        // --- 2. Fetch All Games (For Hero/Cards) ---
        const fetchGames = async () => {
            const { data, error } = await supabase.from('games').select();
            if (!error) setProducts(data);
        };

        fetchGames();
        fetchUserCart(); // Load cart on refresh if already logged in

        // --- 3. AUTH LISTENER: Handle Login/Logout Sync ---
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                fetchUserCart(); // Pull data from DB when user logs in
            }
            if (event === 'SIGNED_OUT') {
                setNewProduct([]); // Wipe local cart on logout
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <ProductApi.Provider value={{ products, setProducts, newProduct, setNewProduct, open, setOpen }}>
            {children}
        </ProductApi.Provider>
    );
};

export default ProductsData;
