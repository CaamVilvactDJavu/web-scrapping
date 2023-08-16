import React, { useState, useEffect } from 'react'

function Sensor() {
    const [table, setTable] = useState("<p>Loading...</p>")

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000/sensors")
                const result = await response.text()
                setTable(result)
            } catch (error) {
                console.error("Error fetching data:", error)
                setTable("<p>Error loading data.</p>")
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <h1 className="text-4xl mb-6 font-bold">Sensors</h1>
            <table className='table'>
                <div className="bg-gray-100 min-h-screen p-6 font-bold overflow-x-auto">
                    <header className="text-center">
                        <div dangerouslySetInnerHTML={{ __html: table }}></div>
                    </header>

                </div>
            </table>
        </>
    )
}

export default Sensor
