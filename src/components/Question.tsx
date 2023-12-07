import React, { useState } from 'react'


interface Answer {
    id: number;
    text: string;
    color: string;
}

type Props = {
    id: number
    question: string;
    answers: Answer[];
    onAnswer: (answer: Answer) => void;
}


const Question = ({ question,answers, onAnswer }: Props) => {

    // const question: any = {
    //     id: id,
    //     text: "Question 1",
    //     answers: [{
    //         id: 1, text: "Reponse 1", color: "jaune"
    //     }, {
    //         id: 2, text: "Reponse 2", color: "rouge"
    //     }, {
    //         id: 3, text: "Reponse 3", color: "bleu"
    //     }, {
    //         id: 4, text: "Reponse 4", color: "vert"
    //     }]
    // };



    return (
        <>
            <div>
                <h1>{question}</h1>

                {/* List the answers possible */}
                {answers?.map((answer: Answer) => (
                    <div key={answer.id}>
                        <button onClick={() => onAnswer(answer)}>{answer.text}</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Question