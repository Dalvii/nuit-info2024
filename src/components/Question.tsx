import { useState } from "react";
import { QuestionType } from "../shared/types";
import logo from "../assets/logo.svg";
interface Answer {
    id: number;
    text: string;
}

type Props = {
    onAnswer: (answer: Answer) => void;
} & QuestionType;


const Question = ({ question, answers, trueAnswer, onAnswer }: Props) => {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <>
            <div className="question">
                <h1>{question}</h1>
                <div className="listAnswer">
                    {answers?.map((answer: Answer) => (
                            <button
                                disabled={selected != null} // Disable the button if it's already selected
                                className={`${trueAnswer == answer.id ? "correct" : selected === answer.id ? "selected" : ""} answer`}
                                onClick={() => {
                                    onAnswer(answer);
                                    setSelected(answer.id);
                                }}
                            >
                                {answer.text}
                            </button>
                    ))}</div>
            </div>
        </>
    );
};

export default Question