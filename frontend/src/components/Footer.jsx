import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

function Footer() {
    const [currentDate, setCurrentDate] = useState(DateTime.utc())

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(DateTime.utc())
        },)

        return () => clearInterval(interval)
    }, [])

    const format = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }

    return (
        <footer className="footer footer-center p-4 bg-base-300 mt-2 text-base-content fixed inset-x-0 bottom-0 font-bold">
            <div>
                <p>Copyright © 2023 - All rights reserved by ACME Industries Ltd</p>
            </div>
            <div>
                <p>{currentDate.setZone('Asia/Jakarta').toLocaleString(format)} WIB</p>
                <p>{currentDate.setZone('Asia/Makassar').toLocaleString(format)} WITA</p>
                <p>{currentDate.setZone('Asia/Jayapura').toLocaleString(format)} WIT</p>
                <p>{currentDate.toUTC().toLocaleString(format)} UTC</p>
            </div>
        </footer>
    );
}

export default Footer;