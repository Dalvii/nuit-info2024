export type Player = {
    sokcet_id: string
    pseudo: string;
    score: number;
}

export interface Answer {
    id: number;
    text: string;
}

export type QuestionType = {
    id: number;
    time: number;
    question: string;
    answers: Answer[];
    trueAnswer: number | null;
}

export type joinedGame = {
    id: string,
    players: string
}