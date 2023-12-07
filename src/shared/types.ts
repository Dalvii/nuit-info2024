export type Player = {
    sokcet_id: string
    pseudo: string;
    score: number;
}

export interface Answer {
    id: number;
    text: string;
    color: string;
}

export type QuestionType = {
    id: number;
    time?: number;
    question: string;
    answers: Answer[];
}