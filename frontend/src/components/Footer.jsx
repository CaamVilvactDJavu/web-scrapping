import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

function Footer() {
    const [currentDate, setCurrentDate] = useState(DateTime.utc());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(DateTime.utc());
        }, 1000); // Every 1 second

        return () => clearInterval(interval);
    }, []);

    const format = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    };

    return (
        <footer className="footer footer-center p-4 mt-2 text-base-content bg-gray-100">
            <div className="flex justify-between items-center w-full border-t-2 py-2">
                <p>Copyright © 2023 - All rights reserved by c.a._.a.m</p>
                <div className="text-right">
                    <p>{currentDate.setZone('Asia/Jakarta').toLocaleString(format)} WIB</p>
                    <p>{currentDate.setZone('Asia/Makassar').toLocaleString(format)} WITA</p>
                    <p>{currentDate.setZone('Asia/Jayapura').toLocaleString(format)} WIT</p>
                    <p>{currentDate.toUTC().toLocaleString(format)} UTC</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
