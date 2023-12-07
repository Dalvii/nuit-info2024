import React from 'react'

interface Props {
    join: () => void;
    pseudo: string;
    setPseudo: (pseudo: string) => void;
}

export const Login = ({ join, setPseudo, pseudo }: Props) => {
    return (
        <>
            <h1>Quiz multijoueur</h1>
            <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
            <button onClick={() => join()}>Entrer</button>
        </>
    )
}