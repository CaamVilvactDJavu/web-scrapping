import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

function Footer() {
    const now = DateTime.now();
    const [currentDate, setCurrentDate] = useState(now);
    const [formattedDate, setFormattedDate] = useState(now.setLocale('en').toLocaleString({ weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }));

    useEffect(() => {
        const interval = setInterval(() => {
            const newDate = DateTime.utc();
            setCurrentDate(newDate);
            setFormattedDate(newDate.setLocale('en').toLocaleString({ weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const format = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    };

    return (
        <footer className="footer p-6 mt-2 bg-base-100 shadow-inner text-base-content">
            <div className="container mx-auto flex flex-wrap justify-between items-center border-t-2 pt-4">
                <div className="w-full md:w-auto text-center md:text-left">
                    <p className="mb-2 md:mb-0">Copyright © {currentDate.year} - All rights reserved by c.a._.a.m</p>
                </div>
                <div className="text-center md:text-right space-y-2">
                    <p>{formattedDate} {currentDate.setZone('Asia/Jakarta').toLocaleString(format)} WIB</p>
                    <p>{currentDate.setZone('Asia/Makassar').toLocaleString(format)} WITA</p>
                    <p>{currentDate.setZone('Asia/Jayapura').toLocaleString(format)} WIT</p>
                    <p>{currentDate.toUTC().toLocaleString(format)} UTC</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
