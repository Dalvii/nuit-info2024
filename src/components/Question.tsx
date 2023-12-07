import { useState } from "react";
import { QuestionType } from "../shared/types";

interface Answer {
    id: number;
    text: string;
    color: string;
}

type Props = {
    onAnswer: (answer: Answer) => void;
} & QuestionType;


const Question = ({ question, answers, trueAnswer, onAnswer }: Props) => {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <>
            <div>
                <h1>{question}</h1>
                {answers?.map((answer: Answer) => (
                    <div key={answer.id}>
                        <button
                            disabled={selected != null} // Disable the button if it's already selected
                            style={{ backgroundColor: answer.color }}
                            className={selected === answer.id ? trueAnswer == answer.id ? "correct" : "selected" : ""}
                            onClick={() => {
                                onAnswer(answer);
                                setSelected(answer.id);
                            }}
                        >
                            {answer.text}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Question