import React, { useState } from 'react'


interface Answer {
    id: number;
    text: string;
    color: string;
}

type QuestionType = {
    id: number
    text?: string;
    answers?: Answer[];
}


const Question = ({ id }: QuestionType) => {
    const [answer, setAnswer] = useState('')

    let question: QuestionType = {
        id: id,
        text: "text"
    };

    function sendAnswer() {
        // socket.emit('sendAnswer', { pseudo, answer, gameId: game.id, userId: user.id })
    }

    return (
        <>
            <div>
                <h1>{question.text}</h1>
                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                <button onClick={() => sendAnswer()}>Envoyer</button>
            </div>
        </>
    )
}

export default Question