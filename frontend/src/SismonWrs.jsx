import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ReactToPrint from "react-to-print";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

function getCellColor(content) {
    const colors = ["green", "yellow", "orange", "red", "grey", "black"];
    return colors.includes(content.toLowerCase()) ? content.toLowerCase() : "";
}

function SismonWrs() {
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const componentRef = useRef();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000/sismon_wrs");
                const result = await response.json();
                setRows(result);
                setIsLoading(false);
            } catch (error) {
                setError("Error loading data.");
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <h1 className="text-4xl p-2 mb-6 font-bold text-center">Realtime Seismic Stations</h1>
            <ReactToPrint
                trigger={() => <button className="btn btn-outline m-4"><FontAwesomeIcon icon={faPrint} /> Print</button>}
                content={() => componentRef.current}
            />
            <div ref={componentRef} className="flex flex-col min-h-screen overflow-x-auto">
                <div className='flex-grow overflow-x-auto'>
                    {isLoading ? (
                        <div className='flex justify-center items-center h-full'>
                            <p className='font-bold text-xl'>Loading</p>
                            <span className="loading loading-ring loading-xs"></span>
                            <span className="loading loading-ring loading-sm"></span>
                            <span className="loading loading-ring loading-md"></span>
                            <span className="loading loading-ring loading-lg"></span>
                        </div>
                    ) : error ? (
                        <div className='flex justify-center items-center h-full'>
                            <p className='font-bold text-xl'>{error}</p>
                        </div>
                    ) : (
                        <table className="table w-full">
                            <thead className='bg-slate-300'>
                                <tr>
                                    <th>No.</th>
                                    {[...Object.keys(rows[0])].reverse().map((header) => (
                                        <th key={header}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{rowIndex + 1}</td>
                                        {[...Object.values(row)].reverse().map((value, valueIndex) => (
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

export default SismonWrs;
