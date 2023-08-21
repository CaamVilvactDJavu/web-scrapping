import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function getCellColor(content) {
    const colors = ["green", "yellow", "orange", "red", "grey", "black"];
    return colors.includes(content.toLowerCase()) ? content.toLowerCase() : "";
}

function Sensor() {
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000/sensors");
                const result = await response.json();
                setRows(result);  // reverse the rows here
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error loading data.");
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <h1 className="text-4xl p-4 mb-6 font-bold text-center">Sensors</h1>
            <div className="flex flex-col min-h-screen overflow-x-auto">
                <div className='flex-grow overflow-x-auto'>
                    {error ? (
                        <p>{error}</p>
                    ) : rows.length === 0 ? (
                        <div className='flex justify-center items-center h-full'>
                            <p className=' font-bold text-xl'>Loading</p>
                            <span className="loading loading-ring loading-xs"></span>
                            <span className="loading loading-ring loading-sm"></span>
                            <span className="loading loading-ring loading-md"></span>
                            <span className="loading loading-ring loading-lg"></span>
                        </div>
                    ) : (
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No.</th>  {/* Keep row number header as is */}
                                    {[...Object.keys(rows[0])].reverse().map((header) => (   // Reverse the headers
                                        <th key={header}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{rowIndex + 1}</td>  {/* Keep row number as is */}
                                        {[...Object.values(row)].reverse().map((value, valueIndex) => (  // Reverse the row values
                                            <td key={valueIndex} style={{ color: getCellColor(value) }}>{value}</td>
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

export default Sensor;