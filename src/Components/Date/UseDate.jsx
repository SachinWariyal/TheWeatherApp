import { useEffect, useState } from "react";

export const UseDate = () => {
    const locale = 'en';

    const [today, setDate] = useState(new Date());  
    
    useEffect (() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 60 * 1000);

        return () => {
            clearTimeout(timer);
        }   
    },[today])

    const day = today.toLocaleDateString(locale, { weekday: 'long' });

    const date = `${day}, ${today.getDate()}, ${today.toLocaleDateString(locale, {month: 'long'})}\n\n`;
    
    // const time = today.toLocaleDateString(locale, {hour: 'numeric', hour12: true, minute: 'numeric'});
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric' });

    return{
        date, time
    }
}   