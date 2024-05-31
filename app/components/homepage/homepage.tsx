"use client";
import { addUrl, getIssues } from '@/api';
import React, { useState, useEffect } from 'react';
import Checklist from './checklist'
interface Errors {
    size: string;
}

interface Issue {
    id: number;
    type: string;
    solved: number;
    priority: number;
    date: string;
    urls_id: number;
    sites_id: number;
}

function Homepage() {
    const [websiteUrl, setWebsiteUrl] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({ size: "" });
    const [isFormValid, setIsFormValid] = useState<boolean>(true);
    const [issues, setIssues] = useState<Issue[]>([]);

    async function submitWebsite() {
        console.log(websiteUrl);
        const res = await addUrl(websiteUrl)
        console.log(res)
        if (res == false) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }


    async function fetchIssues() {
        try {
            const issuesData = await getIssues("2");
            setIssues(issuesData);
        } catch (error) {
            console.error("Error fetching issues:", error);
        }
    }

    useEffect(() => {
        fetchIssues();
    }, []);

    async function customWebsite(website) {
        console.log(website);
        setWebsiteUrl(website)
    }

    return (
        <div className="max-w-4xl m-auto p-5 sm:p-20">

            
            <h1 className="text-base sm:text-4xl font-bold text-white drop-shadow-md">Placez-vous en 1ère position,</h1>
            <h2 className="text-base sm:text-4xl font-extralight text-white drop-shadow-md">Analysez votre site en 15 secondes.</h2>
            <div style={{ marginTop: "45px" }} className='join flex flex-wrap gap-4'>
                <div className='flex'>
                    <span className='input input-bordered' style={{ display: "flex", alignItems: "center", borderRadius: "8px 0px 0px 8px" }}><span style={{ opacity: 1, color: 'white' }}>https://</span></span>
                    <input value={websiteUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsiteUrl(e.target.value)} type="text" placeholder="votresite.com" className="input input-bordered w-full max-w-xs" style={{ borderRadius: "0px 8px 8px 0px" }} />
                </div>
                <button className="btn btn-blue" onClick={() => submitWebsite()}>Analyser mon site</button>
            </div>
            {!isFormValid &&
                <div role="alert" className="alert alert-warning mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>URL invalide</span>
                </div>
            }

            <button className="btn btn-outline" onClick={() => customWebsite("epiceriedusud.fr")}>epiceriedusud.fr</button>
            <button className="btn btn-outline" onClick={() => customWebsite("www.durand-plomberie.com")}>www.durand-plomberie.com</button>
            <button className="btn btn-outline" onClick={() => customWebsite("www.lagranderecre.fr")}>www.lagranderecre.fr</button>

            <Checklist />
            <div style={{overflowX: "auto"}}>
            <div className="stats shadow" >

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">Pages détectés</div>
                    <div className="stat-value">31K</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div className="stat-title">Manque de contenu</div>
                    <div className="stat-value">4,200</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">Balises manquantes</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>
            </div>


            <h3 className="text-xl font-bold text-white">Problèmes détectés :</h3>

            <div className="overflow-x-auto mt-10">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Priorité</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue, index) => (
                            <tr key={issue.id}>
                                <td>{index + 1}</td>
                                <td>{issue.type}</td>
                                <td>{issue.priority}</td>
                                <td>{new Date(issue.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Homepage;
