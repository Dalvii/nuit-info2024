import { useState } from 'react'
import './App.css'

import Question from './components/Question'
import { Login } from './components/Login'
import { Player } from './shared/types'
import socket from './socket'

function App() {
	const [pseudo, setPseudo] = useState('')
	const [listPlayer, setListPlayer] = useState<Player[]>([])
	const [isLogged, setIsLogged] = useState(false)

	const questiontest = true;

	function login() {
		socket.join(pseudo);
		socket.joinEvent((pseudo) => {
			setIsLogged(true)
		})
	}

	function answer() {
		console.log("answer")	
	}
	const listAnswers = [{
		id: 1, text: "Reponse 1", color: "jaune"
	}, {
		id: 2, text: "Reponse 2", color: "rouge"
	}, {
		id: 3, text: "Reponse 3", color: "bleu"
	}, {
		id: 4, text: "Reponse 4", color: "vert"
	}];
	return (
		<div>
			{isLogged == true ?
				<Question id={0} question={'Test Question'} answers={listAnswers} onAnswer={answer} />
				:
				<Login join={() => login()} pseudo={pseudo} setPseudo={setPseudo} />
			}
		</div>
	)
}

export default App
