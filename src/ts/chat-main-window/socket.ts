/* eslint-disable prefer-destructuring */
import Cookies from 'js-cookie';
import { scrollToMessage } from '../page-operations';
import { URL } from '../constants';
import { createMessageFromSocket } from './send-message';

export function connectWebSocket(url: string, token: string): WebSocket {
    return new WebSocket(url + token);
}

class SocketHandler {
    private webSocket: WebSocket | null = null;

    private wssUrl: string;

    private token: string;

    constructor(wssUrl: string, token: string) {
        this.wssUrl = wssUrl;
        this.token = token;
    }

    setToken = (token: string) => {
        this.token = token;
    };

    public init() {
        this.connect();
    }

    public connect() {
        this.webSocket = new WebSocket(`${this.wssUrl}${this.token}`);
        this.webSocket.onmessage = this.handleOnMessage;
        this.webSocket.onclose = this.handleCheckOnClose;
    }

    public sendMessage(message: string) {
        this.webSocket?.send(message);
    }

    public close() {
        const closeCode = 1000;
        this.webSocket?.close(closeCode);
    }

    private handleCheckOnClose = () => {
        const timeToReconnect = 100;
        setTimeout(() => this.connect(), timeToReconnect);
    };

    // eslint-disable-next-line class-methods-use-this
    private handleOnMessage = (event: MessageEvent<string>) => {
        try {
            const messageData = JSON.parse(event.data);

            if (!messageData) throw new Error('Что-то не так с данными..');

            createMessageFromSocket(messageData);
            scrollToMessage();
        } catch (error) {
            if (error instanceof Error) {
                console.error(error?.message);
                console.error(event.data);
            }
        }
    };
}

export const socketHandle = new SocketHandler(URL.webSocketUrl, Cookies.get('token')!);
