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


	function login() {
		socket.join(pseudo);
		socket.joinEvent((pseudo) => {
			setIsLogged(true)
		})
	}

	return (
		<div>
			{isLogged == true ?
				<Question id={0} text={'Test Question'} answers={[]} />
				:
				<Login join={() => login()} pseudo={pseudo} setPseudo={setPseudo} />
			}
		</div>
	)
}

export default App
