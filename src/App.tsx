import { useState } from 'react'
import './App.css'

import Question from './components/Question'

function App() {
	const [pseudo, setPseudo] = useState('')
	// const [isLogged, setIsLogged] = useState(false)

	const questiontest = true

	function login() {
		// setIsLogged(true)
	}

	return (
		<div>
			{questiontest == true ?
				<Question id={0} text={'Test Question'} answers={[]} />
				:
				<>
					<h1>Quiz multijoueur</h1>
					<input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
					<p>{pseudo}</p>
					<button onClick={() => login()}>Entrer</button>
				</>
			}
		</div>
	)
}

export default App
