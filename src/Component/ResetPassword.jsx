import React, { useState } from 'react';
import supabase from '../data/supabaseClient';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.updateUser({ password });
        if (error) alert(error.message);
        else {
            alert("Password updated!");
            navigate('/Login');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <form onSubmit={handleUpdate} className="bg-gray-900 p-10 rounded-3xl w-full max-w-md border border-white/10 space-y-6">
                <h2 className="text-2xl font-black text-white uppercase">New Password</h2>
                <input type="password" placeholder="Enter new password" required onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 p-4 rounded-xl text-white border border-white/10 outline-none focus:border-green-500" />
                <button type="submit" className="w-full py-4 bg-green-600 text-white rounded-xl font-black">UPDATE PASSWORD</button>
            </form>
        </div>
    );
};

export default ResetPassword;
