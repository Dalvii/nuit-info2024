import { io, Socket } from 'socket.io-client';
import { joinedGame, Player } from './shared/types';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? 'http://localhost:4000' : 'http://172.20.10.8:5001 ';
const URL = 'http://172.20.10.8:5001/'
console.log(URL);

const socket = io(URL);
socket.connect();
socket.on('connect', () => {
    console.log('connected');
}   );

socket.on('disconnect', () => {
    console.log('connected');
})
socket.on('next_question', (e) => console.log(e));
/*
{
  game_joined: {
    id: id_game,
    players: [blabla, blabla]
   } 
}
*/

class SocketService {
    public socket: Socket;

    constructor() {
        this.socket = socket;
        
    }

    public questionEvent(callback: (...args: any[]) => void) {
        console.log("question event");
        this.socket.on('next_question', callback);
        this.socket.on('next_question', (e) => console.log(e));
    }

    public answerEvent(callback: (...args: any[]) => void) {
        console.log("result event");
        this.socket.on('result', callback);
    }

    public sendAnswer(answer: string) {
        this.socket.emit('send_answer', answer);
    }
    public createGame(pseudo:string) {
        this.socket.emit('create_game',{pseudo:pseudo});
    }
    public gameCreatedEvent(callback: (data: {id_game:string}) => void) {
        this.socket.on('game_created', (data: {id_game:string}) => {
            console.log("game created socket");
            callback(data);
        });
    }

    public join(pseudo: Player['pseudo'],game_id:string) {
        this.socket.emit('join_game', {pseudo:pseudo,id_game:game_id});
    }

    public joinEvent(callback: (data: joinedGame) => void) {
        this.socket.on('game_joined', (json: joinedGame) => {
            callback(json);
        });
    }

    public startGame(partyCode: string) {
        this.socket.emit('start_game', {id_game: partyCode});
    }
}

export default new SocketService();

