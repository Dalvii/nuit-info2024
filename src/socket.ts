import { io, Socket } from 'socket.io-client';
import { Player } from './shared/types';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? 'http://localhost:4000' : 'http://localhost:4000';

const socket = io(URL);

interface SendAnswerPayload {
    pseudo: string;
    answer: string;
    gameId: string;
    userId: string;
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

    public join(pseudo: Player['pseudo']) {
        this.socket.emit('join', pseudo);
    }

    public joinEvent(callback: (...args: any[]) => void) {
        this.socket.on('joinEvent', callback);
    }

    public startGame() {
        this.socket.emit('startGame');
    }
}

export default new SocketService();

