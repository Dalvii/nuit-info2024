import { useState, useEffect } from 'react';

const Timer = ({ initialValue }: { initialValue: number }) => {
    const [seconds, setSeconds] = useState(initialValue);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Format seconds as mm:ss
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Show time in mm:ss format if seconds > 0, else show "Temps écoulé"
    return <div className={`timer ${seconds < 5 ? seconds <= 3 ? 'rouge' : 'orange' : ''}`}>{seconds > 0 ? formatTime(seconds) : "Temps écoulé"}</div>;
};

export default Timer;
