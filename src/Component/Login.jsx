import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FaAngleLeft } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router';
import supabase from '../data/supabaseClient';

const Login = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {
        setLoading(true);
        setLoginError(null);
        
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.username,   
                password: formData.password,
            });

            if (error) {
                setLoginError("Invalid credentials. Access denied.");
            } else if (data.user) {
                // replace: true prevents the 'Lock broken' error by clearing the history stack
                navigate('/', { replace: true }); 
            }
        } catch (err) {
            setLoginError("Connection failed. Check your internet.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='flex justify-center items-center bg-[#FDFDFD] min-h-screen font-sans antialiased'>
            {/* Minimalist Surface with Deep Shadow */}
            <div className='bg-white relative flex flex-col items-center w-full max-w-md p-12 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] animate-in fade-in zoom-in duration-500'>
                
                {/* Back Link - No Border */}
                <Link to='/' className="absolute left-10 top-12 text-black hover:text-green-500 transition-colors">
                    <FaAngleLeft size={24} />
                </Link>
                
                {/* Logo & Header */}
                <div className='mb-8'>
                    <img src="/favicon.svg" className='w-14 h-14' alt="Gamer Zone" />
                </div>
                
                <h1 className='text-3xl font-black tracking-tighter uppercase italic mb-2'>Welcome back</h1>
                <p className='text-gray-400 text-xs font-bold uppercase tracking-widest mb-10'>Sign in to your account</p>

                {/* Refined Error Alert */}
                {loginError && (
                    <div className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl mb-8 text-[11px] font-black uppercase tracking-wider w-full text-center">
                        {loginError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-6'>
                    {/* Email Input - No Border */}
                    <div className='space-y-1'>
                        <label className='text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest'>Email Address</label>
                        <input 
                            type="email"
                            placeholder='name@example.com' 
                            className='w-full bg-gray-50 border-none outline-none focus:ring-2 ring-green-100 p-5 rounded-[1.8rem] text-sm font-bold placeholder:text-gray-300'  
                            {...register("username", { required: "Email is required" })} 
                        />
                        {errors.username && <span className='text-[10px] text-red-400 ml-4 font-bold'>{errors.username.message}</span>}
                    </div>

                    {/* Password Input - No Border */}
                    <div className='space-y-1'>
                        <label className='text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest'>Password</label>
                        <input 
                            type="password"
                            placeholder='••••••••' 
                            className='w-full bg-gray-50 border-none outline-none focus:ring-2 ring-green-100 p-5 rounded-[1.8rem] text-sm font-bold placeholder:text-gray-300' 
                            {...register("password", { required: "Password is required" })} 
                        />
                        {errors.password && <span className='text-[10px] text-red-400 ml-4 font-bold'>{errors.password.message}</span>}
                    </div>

                    {/* Submit - Minimal Black to Green */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className='w-full py-5 bg-black text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-green-500 hover:text-black transition-all duration-300 shadow-xl shadow-black/10 active:scale-95 disabled:bg-gray-200'
                    >
                        {loading ? 'Processing...' : 'Sign In'}
                    </button>

                    <div className='pt-4'>
                        <p className='text-gray-300 font-bold text-center text-[11px] uppercase tracking-tighter'>
                            New Gamer? <Link to='/signup' className='text-green-500 hover:underline'>Register Account</Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;
