"use client";
import React, { useState } from 'react';

interface Errors {
    size: string;
}

function Homepage() {
    const [websiteUrl, setWebsiteUrl] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({ size: "" });
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    function submitWebsite() {
        errorCheckerInput()
        console.log(websiteUrl);
    }

    function errorCheckerInput(): undefined {
        let errors: Errors = { size: "" };
        if (websiteUrl.length < 5) {
            errors.size = "URL invalide";
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }

    return (
        <div className="max-w-4xl m-auto p-5 sm:p-20">
            <h1 className="text-base sm:text-4xl font-bold text-white drop-shadow-md">L'outil SEO surpuissant !</h1>
            <h2 className="text-base sm:text-4xl font-extralight text-white drop-shadow-md">Analysez votre site en 15 secondes.</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "45px" }} className='join'>
                <input value={websiteUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsiteUrl(e.target.value)} type="text" placeholder="votresite.com" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-blue" onClick={() => submitWebsite()}>Analyser mon site</button>
            </div>
            {errors.size && 
                <div role="alert" className="alert alert-info mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>{errors.size}</span>
                </div>
            }
        </div>
    );
}

export default Homepage;
