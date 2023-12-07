import { io, Socket } from 'socket.io-client';

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

    public on(event: string, callback: (...args: any[]) => void) {
        this.socket.on(event, callback);
    }

    public sendAnswer(payload: SendAnswerPayload) {
        this.socket.emit('sendAnswer', payload);
    }
}

export default new SocketService();

