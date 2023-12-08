interface Props {
    start: () => void;
}

export const Attente = ({start}:Props) => {
    return (
        <>
            <h1>En attente du départ</h1>
            <button onClick={start}>Commencer</button>
        </>
    )
}