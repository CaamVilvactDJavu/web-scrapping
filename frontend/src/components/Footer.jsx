import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";


function Footer() {
    const now = DateTime.now();

    const [currentDate, setCurrentDate] = useState(now);
    const [formattedDate, setFormattedDate] = useState(
        now.setLocale('en').toLocaleString({ weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const newDate = DateTime.utc();
            setCurrentDate(newDate);
            setFormattedDate(
                newDate.setLocale('en').toLocaleString({ weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
            );
        }); // Every 1 second

        return () => clearInterval(interval);
    }, []);

    const format = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    };

    return (
        <footer className="footer footer-center p-4 mt-2 text-base-content ">
            <div className="flex justify-between items-center w-full border-t-2 py-2">
                <p>Copyright © {currentDate.year} - All rights reserved by c.a._.a.m</p>
                <div className="text-right">
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
