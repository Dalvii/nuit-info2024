import { QuestionType } from "../shared/types";

interface Answer {
    id: number;
    text: string;
    color: string;
}

type Props = {
    onAnswer: (answer: Answer) => void;
} & QuestionType;


const Question = ({ question,answers, onAnswer }: Props) => {
    return (
        <>
            <div>
                <h1>{question}</h1>
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