import { useEffect, useState } from 'react'
import './App.css'

import Question from './components/Question'
import { QuestionType, Answer } from './shared/types'
import { Login } from './components/Login'
import { Player } from './shared/types'
import socket from './socket'
import Timer from './components/Timer'

function App() {
	const [pseudo, setPseudo] = useState('')
	const [listPlayer, setListPlayer] = useState<Player[]>([])
	const [isLogged, setIsLogged] = useState(false)

	const [questionOrAnswer, setQuestionOrAnswer] = useState('question')
	const [trueAnswer, setTrueAnswer] = useState('')
	const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null)


	useEffect(() => {
		setCurrentQuestion({
			time: 10,
			id: 1,
			question: "Question 1",
			answers: [{
				id: 1, text: "Reponse 1", color: "jaune"
			}, {
				id: 2, text: "Reponse 2", color: "rouge"
			}, {
				id: 3, text: "Reponse 3", color: "bleu"
			}, {
				id: 4, text: "Reponse 4", color: "vert"
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
		})

		socket.answerEvent((answer: string) => {
			setQuestionOrAnswer('answer')
			setTrueAnswer(answer)
		})
	}


	return (
		<div>
			{isLogged == true ?
				(questionOrAnswer == 'question' ?
					<>
						<Timer />
						{currentQuestion && currentQuestion.answers ?
							<Question id={0} question={'Test Question'} answers={currentQuestion.answers} onAnswer={sendAnswer} />
							:
							<h1>En attente de la prochaine question</h1>
						}
					</>
					:
					<p>{trueAnswer}</p>
				)
				:
				<Login join={() => login()} pseudo={pseudo} setPseudo={setPseudo} />
			}
		</div>
	)
}

export default App
