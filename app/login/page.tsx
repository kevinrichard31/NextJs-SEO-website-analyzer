"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import { login } from '@/api'; // Assurez-vous d'avoir une fonction login dans votre api.ts pour gérer l'authentification
import ThemeContext from '@/context/context';
import { useContext } from 'react';

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    const { theme, connected, toggleTheme, setConnected } = context;
    const handleLogin = async () => {
        if (!email || !password) {
            setError("Tous les champs sont obligatoires");
            return;
        }
        try {
            const res = await login({ email, password });
            if (res.token) {
                localStorage.setItem('token', res.token);
                setError("");
                router.push('/account'); // Redirigez vers la page du compte utilisateur
            } else {
                setError(res.msg);
            }
        } catch (error) {
            setError("Erreur lors de la connexion");
        }
    };

    return (
        <div>
            <Header />
            <div className="max-w-4xl m-auto p-5 sm:p-20 flex flex-col">
                <h1 className="text-2xl font-bold text-white">Connexion</h1>
                <div>{connected ? "Connected" : "Not Connected"}</div> {/* Utilisation correcte de JSX */}                <div className="mt-4">
                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className='flex flex-col gap-2 max-w-xs flex'>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full max-w-xs mb-2"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full max-w-xs mb-2"
                        />
                                            <button className="btn btn-blue" onClick={handleLogin}>Se connecter</button>
                    </form>
                    {error && (
                        <div role="alert" className="alert alert-warning mt-2">
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
