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
                const result = await response.json();
                if (response.ok) {
                    setData(result);
                } else {
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
                    <div>
                        <p>{data.message}</p>
                        <table>
                            <thead>
                                <tr>
                                    {data.data[0] && Object.keys(data.data[0]).map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.data.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.values(row).map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Sensors2