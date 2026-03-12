import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FaAngleLeft } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router';
import supabase from '../data/supabaseClient';

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const password = watch("password");

    const onSubmit = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            // 1. Create Auth User
            const { data, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: { username: formData.username } // Stores username in metadata
                }
            });

            if (authError) throw authError;

            if (data.user) {
                // 2. Create entry in your 'profiles' table
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        { 
                            id: data.user.id, 
                            username: formData.username,
                            email: formData.email 
                        }
                    ]);

                if (profileError) throw profileError;

                alert("Account created! Please check your email for verification.");
                navigate('/Login');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='flex justify-center items-center bg-[#FDFDFD] min-h-screen font-sans antialiased py-10'>
            <div className='bg-white relative flex flex-col items-center w-full max-w-lg p-12 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)]'>
                
                <Link to='/Login' className="absolute left-10 top-12 text-black hover:text-green-500 transition-colors">
                    <FaAngleLeft size={24} />
                </Link>
                
                <div className='mb-8'>
                    <img src="/favicon.svg" className='w-14 h-14' alt="Gamer Zone" />
                </div>
                
                <h1 className='text-3xl font-black tracking-tighter uppercase italic mb-2'>Create Account</h1>
                <p className='text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-10 text-center'>Join the ultimate gaming zone</p>

                {error && (
                    <div className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl mb-8 text-[11px] font-black uppercase tracking-wider w-full text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-5'>
                    {/* Username */}
                    <div className='space-y-1'>
                        <label className='text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest'>Gamer Tag</label>
                        <input 
                            type="text"
                            placeholder="Unique username"
                            className='w-full bg-gray-50 border-none outline-none focus:ring-2 ring-green-100 p-4 rounded-[1.8rem] text-sm font-bold'
                            {...register("username", { required: "Username is required" })}
                        />
                    </div>

                    {/* Email */}
                    <div className='space-y-1'>
                        <label className='text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest'>Email Address</label>
                        <input 
                            type="email"
                            placeholder="name@example.com"
                            className='w-full bg-gray-50 border-none outline-none focus:ring-2 ring-green-100 p-4 rounded-[1.8rem] text-sm font-bold'
                            {...register("email", { required: "Email is required" })}
                        />
                    </div>

                    {/* Password */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-1'>
                            <label className='text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest'>Password</label>
                            <input 
                                type="password"
                                placeholder="••••••••"
                                className='w-full bg-gray-50 border-none outline-none focus:ring-2 ring-green-100 p-4 rounded-[1.8rem] text-sm font-bold'
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
                            />
                        </div>
                        <div className='space-y-1'>
                            <label className='text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest'>Confirm</label>
                            <input 
                                type="password"
                                placeholder="••••••••"
                                className='w-full bg-gray-50 border-none outline-none focus:ring-2 ring-green-100 p-4 rounded-[1.8rem] text-sm font-bold'
                                {...register("confirm", { 
                                    required: "Please confirm", 
                                    validate: value => value === password || "Passwords do not match" 
                                })}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className='w-full py-5 mt-4 bg-black text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-green-500 hover:text-black transition-all duration-300 shadow-xl shadow-black/10 active:scale-95 disabled:bg-gray-200'
                    >
                        {loading ? 'Creating...' : 'Join Gamer Zone'}
                    </button>

                    <p className='text-gray-300 font-bold text-center text-[11px] uppercase tracking-tighter pt-4'>
                        Already a Member? <Link to='/Login' className='text-green-500 hover:underline'>Sign In</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default SignUp;
