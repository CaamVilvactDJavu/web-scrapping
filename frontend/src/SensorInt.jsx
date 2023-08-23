import React, { useState, useEffect, useRef } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ReactToPrint from "react-to-print";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

function SensorInt() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const componentRef = useRef();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3002/status_int");
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
            <h1 className="text-4xl p-4 mb-6 font-bold text-center">Sensor Intensitymeter</h1>
            <div ref={componentRef} className="flex flex-col min-h-screen overflow-x-auto">
                <div className='flex-grow overflow-x-auto'>
                    {error ? (
                        <p>{error}</p>
                    ) : !data ? (
                        <div className='flex justify-center items-center h-full'>
                            <p className=' font-bold text-xl'>Loading</p>
                            <span className="loading loading-ring loading-xs"></span>
                            <span className="loading loading-ring loading-sm"></span>
                            <span className="loading loading-ring loading-md"></span>
                            <span className="loading loading-ring loading-lg"></span>
                        </div>
                    ) : (
                        <>
                            <ReactToPrint
                                trigger={() => <button className="btn btn-outline m-4"><FontAwesomeIcon icon={faPrint} /> Print</button>}
                                content={() => componentRef.current}
                            />
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        {data[0] && Object.keys(data[0]).map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td>{rowIndex + 1}</td>
                                            {Object.values(row).map((cell, cellIndex) => (
                                                <td key={cellIndex}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SensorInt;
