import { useState } from "react";

interface Props {
    join: () => void;
    createGame: () => void;
    pseudo: string;
    setPseudo: (pseudo: string) => void;
}

export const Login = ({ createGame, join, setPseudo, pseudo }: Props) => {
    const [showInput, setShowInput] = useState(false);
    const [partyCode, setPartyCode] = useState("");

    const handleJoinClick = () => {
        setShowInput(true);
    };

    const handleCreateClick = () => {
        createGame();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPartyCode(e.target.value);
    };

    return (
        <div className="loginDiv">
            <input type="text" placeholder="Username" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />

            <>
                <button onClick={handleJoinClick}>Rejoindre une partie 
                {showInput ? (
                    <input type="text" placeholder="Party Code" value={partyCode} onChange={handleInputChange} />) : ''}
                </button>
                <button onClick={handleCreateClick}>Creer une partie</button>
            </>

        </div>
    );
};
