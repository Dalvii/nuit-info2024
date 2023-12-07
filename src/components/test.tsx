import React, { useState } from 'react'


import socketService from '../socket';



socketService.on('starting', (listPlayer: string) => {
    console.log(question)
})

interface Answer {
    id: number;
    text: string;
    color: string;
}

interface Question {
    id: number
    text: string;
    answers: Answer[];
}


const Question = ({ id }: Question) => {
    const [answer, setAnswer] = useState('')

    const question: Question;
    function sendAnswer() {
        
    }

    return (
        <>
            <div>
                <h1>{question?.question}</h1>
                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                <button onClick={() => sendAnswer()}>Envoyer</button>
            </div>
        </>
    )
}