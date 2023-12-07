import { useEffect, useState } from 'react'
import './App.css'

import Question from './components/Question'
import { QuestionType, Answer } from './shared/types'
import { Login } from './components/Login'
import { Player } from './shared/types'
import socket from './socket'
import Timer from './components/Timer'
import logo from './assets/logo.svg';


function App() {
	const [pseudo, setPseudo] = useState('')
	const [listPlayer, setListPlayer] = useState<Player[]>([])
	const [isLogged, setIsLogged] = useState(true)

	const [questionOrAnswer, setQuestionOrAnswer] = useState('question')
	const [trueAnswer, setTrueAnswer] = useState<number | null>(null)
	const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null)


	useEffect(() => {
		setCurrentQuestion({
			time: 10,
			id: 1,
			question: "Question 1",
			trueAnswer: null,
			answers: [{
				id: 1, text: "Reponse 1"
			}, {
				id: 2, text: "Reponse 2"
			}, {
				id: 3, text: "Reponse 3"
			}, {
				id: 4, text: "Reponse 4"
			}]
		})
	}, [])

	function login() {
		socket.join(pseudo);
		socket.joinEvent((pseudo) => {
			setIsLogged(true)
		})
	}

	function sendAnswer(answer: Answer) {
		socket.sendAnswer('' + answer.id);

	}

	if (isLogged == true) {
		socket.questionEvent((question: QuestionType) => {
			setQuestionOrAnswer('question')
			setCurrentQuestion(question)
			setTrueAnswer(null)
		})

		socket.answerEvent((answer: number) => {
			setQuestionOrAnswer('answer')
			setTrueAnswer(answer)
		})
	}


	return (
		<div>
			{isLogged == true ? (
				<>

					{currentQuestion ? (
						<>
							<img className='logo' src={logo} alt="logo" />
							<Timer initialValue={currentQuestion.time} />
							<Question
								id={currentQuestion.id}
								question={'Test Question'}
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

			) : <Login join={() => login()} pseudo={pseudo} setPseudo={setPseudo} />}
		</div>
	)
}


export default App
