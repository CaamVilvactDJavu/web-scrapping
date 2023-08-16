import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Sensor() {
    const [table, setTable] = useState("<p>Loading...</p>");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000/sensors");
                const result = await response.text();
                setTable(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                setTable("<p>Error loading data.</p>");
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <h1 className="text-4xl mb-6 font-bold text-center">Sensors</h1>
            <div className="min-h-screen overflow-x-auto">
                <div className="table w-full" dangerouslySetInnerHTML={{ __html: table }}></div>
            </div>
            <Footer />
        </>
    );
}

export default Sensor;

