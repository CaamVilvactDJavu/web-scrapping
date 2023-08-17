import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';

function Sensor() {
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000/sensors");
                const result = await response.json();
                setRows(result.reverse());  // reverse the rows here
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
            <h0 className="text-4xl mb-6 font-bold text-center">Sensors</h0>
            <div className="min-h-screen overflow-x-auto">
                {error ? (
                    <p>{error}</p>
                ) : rows.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>No.</th>  {/* Added row number header */}
                                {Object.keys(rows[0]).map((header) => (
                                    <th key={header}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{rowIndex + 1}</td>  {/* Added row number */}
                                    {Object.values(row).map((value, valueIndex) => (
                                        <td key={valueIndex}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Sensor;