import { io, Socket } from 'socket.io-client';
import { Player } from './shared/types';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? 'http://localhost:4000' : 'http://localhost:4000';

const socket = io(URL);


/*
{
  game_joined: {
    id: id_game,
    players: [blabla, blabla]
   } 
}
*/
interface JoinEventPayload {
    id: string;
    players: Player[];
}

class SocketService {
    public socket: Socket;

    constructor() {
        this.socket = socket;
    }

    public questionEvent(callback: (...args: any[]) => void) {
        this.socket.on('questionEvent', callback);
    }

    public answerEvent(callback: (...args: any[]) => void) {
        this.socket.on('answerEvent', callback);
    }

    public sendAnswer(answer: string) {
        this.socket.emit('sendAnswer', answer);
    }
    public createGame(pseudo:string) {
        this.socket.emit('create_game',pseudo);
    }
    public gameCreatedEvent(callback: (gameId: string) => void) {
        this.socket.on('game_created', (gameId: string) => {
            callback(gameId);
        });
    }

    public join(pseudo: Player['pseudo']) {
        this.socket.emit('join', pseudo);
    }

    public joinEvent(callback: (data: JoinEventPayload) => void) {
        this.socket.on('joinEvent', (json: string) => {
            const data = JSON.parse(json);
            callback(data);
        });
    }

    public startGame() {
        this.socket.emit('startGame');
    }
}

export default new SocketService();

