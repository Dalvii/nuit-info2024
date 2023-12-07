import { useState, useEffect } from 'react';

const Timer = ({ initialValue }: { initialValue: number }) => {
    const [seconds, setSeconds] = useState(initialValue);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    // show seconds only if >0 else show "Temps écoulé"
    return <div>{seconds > 0 ? seconds : "Temps écoulé"}</div>;
};

export default Timer;
