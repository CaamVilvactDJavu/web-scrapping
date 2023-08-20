import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function Sensors2() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3001/sensors2");
                if (response.ok) {
                    const result = await response.json();
                    setData(result.message);
                } else {
                    const result = await response.json();
                    setError(result.error);
                }
            } catch (error) {
                setError("Error fetching data.");
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <h1>Flask Backend Response</h1>
                {error ? (
                    <div>Error: {error}</div>
                ) : !data ? (
                    <div>Loading...</div>
                ) : (
                    <div>{data}</div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Sensors2;
