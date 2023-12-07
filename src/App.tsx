import { useEffect, useState } from 'react'
import './App.css'

import Question from './components/Question'
import { QuestionType, Answer } from './shared/types'
import { Login } from './components/Login'
import { Player } from './shared/types'
import socket from './socket'

function App() {
	const [pseudo, setPseudo] = useState('')
	const [listPlayer, setListPlayer] = useState<Player[]>([])
	const [isLogged, setIsLogged] = useState(false)

	const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null)


	useEffect(() => {
		setCurrentQuestion({
			id: 1,
			text: "Question 1",
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

	function answer(answer: Answer) {
		socket.sendAnswer(''+answer.id);
	}

	if (isLogged == true) {
		socket.questionEvent((question: QuestionType) => {
			setCurrentQuestion(question)
		})

		socket.timerEvent((time: number) => {

		})
	}


	return (
		<div>
			{isLogged == false ?
				(currentQuestion && currentQuestion.answers ? 
					<Question id={0} question={'Test Question'} answers={currentQuestion.answers} onAnswer={answer} />
					:
					<h1>En attente de la prochaine question</h1>
				)
				:
				<Login join={() => login()} pseudo={pseudo} setPseudo={setPseudo} />
			}
		</div>
	)
}

export default App
