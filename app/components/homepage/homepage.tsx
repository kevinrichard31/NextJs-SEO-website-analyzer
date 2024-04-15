"use client";
import { addUrl } from '@/api';
import React, { useState } from 'react';
import Checklist from './checklist'
interface Errors {
    size: string;
}

function Homepage() {
    const [websiteUrl, setWebsiteUrl] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({ size: "" });
    const [isFormValid, setIsFormValid] = useState<boolean>(true);

    async function submitWebsite() {
        console.log(websiteUrl);
        const res = await addUrl(websiteUrl)
        console.log(res)
        if(res == false){
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }

    return (
        <div className="max-w-4xl m-auto p-5 sm:p-20">
            <h1 className="text-base sm:text-4xl font-bold text-white drop-shadow-md">Placez-vous en 1ère position,</h1>
            <h2 className="text-base sm:text-4xl font-extralight text-white drop-shadow-md">Analysez votre site en 15 secondes.</h2>
            <div style={{ marginTop: "45px" }} className='join flex flex-wrap gap-4'>
                <div className='flex'>
                    <span className='input input-bordered' style={{display: "flex", alignItems: "center", borderRadius: "8px 0px 0px 8px"}}><span style={{opacity:1, color:'white'}}>https://</span></span>
                    <input value={websiteUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsiteUrl(e.target.value)} type="text" placeholder="votresite.com" className="input input-bordered w-full max-w-xs" style={{borderRadius:"0px 8px 8px 0px"}} />
                </div>
                <button className="btn btn-blue" onClick={() => submitWebsite()}>Analyser mon site</button>
            </div>
            {!isFormValid && 
                <div role="alert" className="alert alert-warning mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>URL invalide</span>
                </div>
            }

            <button className="btn btn-outline">epiceriedusud.fr</button>
            <button className="btn btn-outline">www.durand-plomberie.com</button>
            <button className="btn btn-outline">www.lagranderecre.fr</button>

            <Checklist />
        </div>
    );
}

export default Homepage;
