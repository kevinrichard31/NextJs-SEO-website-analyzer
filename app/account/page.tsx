"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';
import { baseUrl } from '@/api';

const Account = () => {
    const [userInfo, setUserInfo] = useState<{ firstName: string, lastName: string, email: string } | null>(null);
    const [error, setError] = useState<string>("");
    const router = useRouter();

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
            </div>
            <Footer />
        </div>
    );
};

export default Account;
