import { useState } from "react";

interface Props {
    join: () => void;
    createGame: () => void;
    pseudo: string;
    setPseudo: (pseudo: string) => void;
    partyCode: string;
    setPartyCode: (partyCode: string) => void;
}

export const Login = ({ createGame, join, setPseudo, partyCode, setPartyCode, pseudo }: Props) => {
    const [showInput, setShowInput] = useState(false);

    const handleJoinClick = () => {

        setShowInput(true);
        if (partyCode.length > 0) {
            join();
        }
    };

    const handleCreateClick = () => {
        createGame();
    };


    return (
        <div className="loginDiv">
            <input type="text" required placeholder="Username" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />

            <>
                <button onClick={handleJoinClick}>Rejoindre une partie 
                {showInput ? (
                    <input type="text" placeholder="Party Code" value={partyCode} onChange={(e)=>setPartyCode(e.target.value)} />) : ''}
                </button>
                <button onClick={handleCreateClick}>Creer une partie</button>
            </>

        </div>
    );
};
