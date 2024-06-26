"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import Homepage from '../components/homepage/homepage';
import Checklist from '../components/homepage/checklist';
import { register, login } from '@/api';
import { useRouter } from 'next/navigation';

function Register() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const handleRegister = async () => {
        if (!firstName || !lastName || !email || !password) {
            setMessage("Tous les champs sont obligatoires");
            return;
        }
        try {
            const res = await register({ firstName, lastName, email, password });
            console.log(res)
            if (res.msg === "User registered successfully") {
                setMessage("Inscription réussie !");
                const logged = await login({email, password});
                if (logged.token) {
                    localStorage.setItem('token', logged.token);
                    router.push('/account'); // Redirigez vers la page du compte utilisateur
                }
            } else {
                setMessage(res.message);
            }
        } catch (error) {
            setMessage("Erreur lors de l'enregistrement");
        }
    };

    const goLogin = async() => {
        router.push("/login")
    }

    return (
        <div>
            <Header />
            <div className="max-w-4xl m-auto p-5 sm:p-20">
                <h1 className="text-2xl font-bold text-white mb-8 text-center">Créer un compte</h1>
                <div className='flex flex-col gap-2 items-center'>
                    <input
                        type="text"
                        placeholder="Prénom"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input input-bordered w-full max-w-xs mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Nom"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input input-bordered w-full max-w-xs mb-2"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full max-w-xs mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full max-w-xs mb-2"
                    />
                    <button className="btn btn-blue max-w-xs" onClick={handleRegister}>S'enregistrer</button>
                    {message && (
                        <div role="alert" className={`alert mt-2 ${message === "Inscription réussie !" ? "alert-success" : "alert-warning"}`}>
                            <span>{message}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center flex-col">
                    <h1 className="text-2xl font-bold text-white mb-8 mt-16">Vous avez déjà un compte ?</h1>
                    <button className="btn btn-outline" onClick={goLogin}>Se connecter</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
