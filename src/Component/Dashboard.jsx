import React, { useEffect, useState } from 'react';
import supabase from '../data/supabaseClient';
import { LuUser, LuLogOut, LuGamepad, LuLibrary, LuMapPin, LuCircleCheck, LuChevronRight } from 'react-icons/lu';
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const [profile, setProfile] = useState({ username: '', address: '', city: '', pincode: '', email: '' });
    const [library, setLibrary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return navigate('/Login');

            const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            const { data: lib } = await supabase.from('owned_games').select('*, games(*)').eq('user_id', user.id);

            if (prof) setProfile({ ...prof, email: user.email });
            if (lib) setLibrary(lib.map(item => item.games).filter(g => g !== null));
            setLoading(false);
        };
        fetchDashboardData();
    }, [navigate]);

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#FDFDFD] text-black antialiased">
            {/* Minimalist Sidebar */}
            <aside className="w-24 lg:w-72 bg-white flex flex-col p-8">
                <div className="flex items-center gap-3 mb-16">
                    <div className="bg-black p-2 rounded-2xl">
                        <LuGamepad className="text-green-500" size={24}/>
                    </div>
                    <h1 className="font-black text-xl hidden lg:block tracking-tighter uppercase italic">GamerZone</h1>
                </div>

                <nav className="flex-1 space-y-4">
                    <button 
                        onClick={() => setActiveTab('profile')} 
                        className={`group flex items-center gap-4 w-full p-4 rounded-[2rem] transition-all duration-300 ${activeTab === 'profile' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-gray-400 hover:text-black'}`}
                    >
                        <LuUser size={20}/>
                        <span className="hidden lg:block font-bold text-sm">Account</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('library')} 
                        className={`group flex items-center gap-4 w-full p-4 rounded-[2rem] transition-all duration-300 ${activeTab === 'library' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-gray-400 hover:text-black'}`}
                    >
                        <LuLibrary size={20}/>
                        <span className="hidden lg:block font-bold text-sm">Library</span>
                    </button>
                </nav>

                <button 
                    onClick={() => supabase.auth.signOut().then(() => navigate('/Login'))} 
                    className="flex items-center gap-4 w-full p-4 text-gray-400 hover:text-red-500 transition-colors font-bold text-sm"
                >
                    <LuLogOut size={20}/>
                    <span className="hidden lg:block">Sign Out</span>
                </button>
            </aside>

            {/* Main Surface */}
            <main className="flex-1 p-8 lg:p-16 overflow-y-auto">
                <header className="mb-16">
                    <span className="text-green-500 font-black text-xs uppercase tracking-widest">Dashboard</span>
                    <h2 className="text-5xl font-black tracking-tighter mt-2">Welcome, {profile.username || 'Gamer'}</h2>
                </header>

                <div className="max-w-5xl">
                    {activeTab === 'profile' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                            <section className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-gray-200/50">
                                <div className="flex items-center justify-between mb-12">
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-300">Identity & Shipping</h3>
                                    <LuMapPin className="text-green-500" size={24}/>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Gamer Tag</label>
                                        <div className="bg-gray-50 p-5 rounded-[1.8rem] text-sm font-bold">{profile.username || '---'}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Email</label>
                                        <div className="bg-gray-50 p-5 rounded-[1.8rem] text-sm font-bold text-gray-400">{profile.email}</div>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Street Address</label>
                                        <div className="bg-gray-50 p-5 rounded-[1.8rem] text-sm font-bold">{profile.address || 'Not provided'}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-4">City</label>
                                        <div className="bg-gray-50 p-5 rounded-[1.8rem] text-sm font-bold">{profile.city || '---'}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Pincode</label>
                                        <div className="bg-gray-50 p-5 rounded-[1.8rem] text-sm font-bold">{profile.pincode || '---'}</div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    ) : (
                        /* Library Cards */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                            {library.length > 0 ? library.map(game => (
                                <div key={game.id} className="group cursor-pointer">
                                    <div className="relative mb-6 overflow-hidden rounded-[2.5rem] shadow-xl shadow-gray-200">
                                        <img src={game.image} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg">
                                            <LuCircleCheck className="text-green-500" size={18}/>
                                        </div>
                                    </div>
                                    <h4 className="font-black text-xl px-2 tracking-tight group-hover:text-green-600 transition-colors">{game.title}</h4>
                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-2 mt-1">Digital License</p>
                                </div>
                            )) : (
                                <div className="col-span-full py-32 text-center bg-gray-50 rounded-[4rem]">
                                    <LuLibrary size={48} className="mx-auto text-gray-200 mb-4"/>
                                    <p className="text-gray-400 font-bold italic">Your library is currently empty.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
