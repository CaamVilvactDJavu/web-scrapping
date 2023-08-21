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

    // ... (previous code)

    return (
        <>
            <Navbar />
            <h1 className="text-4xl mb-6 font-bold text-center">Sensor Accelerograph</h1>
            <div className="flex flex-col min-h-screen overflow-x-auto">
                <div className='flex-grow overflow-x-auto'>
                    {error ? (
                        <p>{error}</p>
                    ) : !data ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No.</th>  {/* Add No. for row numbering */}
                                    {data[0] && Object.keys(data[0]).map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{rowIndex + 1}</td>  {/* Add row number */}
                                        {Object.values(row).map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Sensors2;
