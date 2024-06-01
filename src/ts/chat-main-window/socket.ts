/* eslint-disable prefer-destructuring */
import Cookies from 'js-cookie';
import { closeModal, openModal, scrollToMessage } from '../page-operations';
import { URL } from '../constants';
import { createMessageFromSocket } from './send-message';
import { main } from './elements';

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
        this.webSocket.onopen = this.handleOnOpen;

        const socketNoOpen = this.webSocket?.readyState === 0;

        if (socketNoOpen) {
            openModal(main.loader);
        }
    }

    public sendMessage(message: string) {
        this.webSocket?.send(message);
    }

    public close() {
        const closeCode = 1000;
        this.webSocket?.close(closeCode);
    }
    
    private handleOnOpen = () => {
        const socketOpen = this.webSocket?.readyState === 1;

        if (socketOpen) {
            closeModal(main.loader);
        }
    };

    private handleCheckOnClose = (event: CloseEvent) => {
        const timeToReconnect = 100;
        const disableCode = 1006;

        if (event.code === disableCode) {
            setTimeout(() => this.connect(), timeToReconnect);
        }
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
