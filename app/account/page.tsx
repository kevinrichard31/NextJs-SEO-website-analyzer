"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';
import { baseUrl } from '@/api';
import ThemeContext from '@/context/context';

const Account = () => {
    const context = useContext(ThemeContext)
    const [userInfo, setUserInfo] = useState<{ firstName: string, lastName: string, email: string } | null>(null);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const { theme, connected, toggleTheme, setConnected } = context;

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }
            try {
                const response = await fetch(`${baseUrl}/userInfo`, {
                    headers: {
                        'x-access-token': token
                    }
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setUserInfo(data);
            } catch (error) {
                setError("Erreur lors de la récupération des informations utilisateur");
                localStorage.removeItem('token');
                router.push('/login');
            }
        };
        fetchUserInfo();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setConnected(false)
        router.push('/register');
    };

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="max-w-4xl m-auto p-5 sm:p-20">
                <h1 className="text-2xl font-bold text-white">Bienvenue, {userInfo.firstName} {userInfo.lastName}</h1>
                <p className="mt-2 text-white">Email: {userInfo.email}</p>
                {error && (
                    <div role="alert" className="alert alert-warning mt-2">
                        <span>{error}</span>
                    </div>
                )}
                <button 
                    onClick={handleLogout} 
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                    Se Déconnecter
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Account;
