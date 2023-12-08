import { useEffect, useState } from "react";
import "./App.css";

import Question from "./components/Question";
import { QuestionType, Answer } from "./shared/types";
import { Login } from "./components/Login";
import { Player } from "./shared/types";
import socket from "./socket";
import Timer from "./components/Timer";
import logo from "./assets/logo.svg";
import { Attente } from "./components/Attente";

function App() {
    const [pseudo, setPseudo] = useState("");
    const [listPlayer, setListPlayer] = useState<Player[]>([]);
    const [isLogged, setIsLogged] = useState(false);
    const [questionOrAnswer, setQuestionOrAnswer] = useState("question");
    const [trueAnswer, setTrueAnswer] = useState<number | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(
        null
    );
    const [isGameStarted, setGameStarted] = useState<boolean>(false);


    const [partyCode, setPartyCode] = useState("");

    // useEffect(() => {
    //     setCurrentQuestion({
    //         time: 10,
    //         id: 1,
    //         question: "Question 1",
    //         trueAnswer: null,
    //         answers: [
    //             {
    //                 id: 1,
    //                 text: "Reponse 1",
    //             },
    //             {
    //                 id: 2,
    //                 text: "Reponse 2",
    //             },
    //             {
    //                 id: 3,
    //                 text: "Reponse 3",
    //             },
    //             {
    //                 id: 4,
    //                 text: "Reponse 4",
    //             },
    //         ],
    //     });
    // }, []);

    function login() {
        socket.join(pseudo, partyCode);
        socket.joinEvent((pseudo) => {
			console.log(pseudo);
            setIsLogged(true);
        });
    }

    function createGame() {
        socket.createGame(pseudo);
		
        socket.gameCreatedEvent((data) => {
			console.log("gameCreatedEvent");
			console.log(data);
			
            setPartyCode(data.id_game);
        });
    }
    function sendAnswer(answer: Answer) {
        socket.sendAnswer("" + answer.id);
    }

	function startGame() {
		socket.startGame(partyCode);
		setGameStarted(true);
	}

	useEffect(() => {
		if (isLogged == true) {
			socket.questionEvent((question: QuestionType) => {
				console.log("questionEvent");
				setGameStarted(true);
				setQuestionOrAnswer("question");
				setCurrentQuestion(question);
				setTrueAnswer(null);
			});
	
			socket.answerEvent((answer: number) => {
				setQuestionOrAnswer("answer");
				setTrueAnswer(answer);
			});
		}
	}, [isLogged])

    return (
        <div>
            <img className="logo" src={logo} alt="logo" />
            {isLogged == true ? (
                <>
					{isGameStarted ? (
                        <>
                            {currentQuestion ? (
						<>
                            <Timer initialValue={currentQuestion.time} />
                            <Question
                                id={currentQuestion.id}
                                question={currentQuestion.question}
                                answers={currentQuestion.answers}
                                time={currentQuestion.time}
                                trueAnswer={trueAnswer}
                                onAnswer={sendAnswer}
                            />
                        </>
                    ) : (
                        <h1>En attente de la prochaine question</h1>
                    )}
                        </>
                    ) : (
                        <Attente start={startGame} />
                    )}
                    
                </>
            ) : (
                <Login
                    createGame={() => createGame()}
                    join={() => login()}
                    pseudo={pseudo}
                    setPseudo={setPseudo}
                    partyCode={partyCode}
                    setPartyCode={setPartyCode}
                />
            )}
        </div>
    );
}

export default App;
