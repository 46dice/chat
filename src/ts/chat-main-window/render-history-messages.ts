/* eslint-disable no-unused-expressions */
/* eslint-disable no-new */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import { toDate } from 'date-fns';
import { URL } from '../constants';
import { uploadHistoryRequest } from './request-upload-history';
import { assigningValuesToTheMessage } from './send-message';
import { dataFromApi, Message } from './interfaces-from-api';
import { main } from './elements';
import Storage from './local-storage-class';

export async function getHistoryMessages(token: string) {
    try {
        const url = URL.pathMessage;

        const response: Response = await uploadHistoryRequest(url, token);
        const messages: dataFromApi = await response.json();
        const arrayMessages = messages.messages;

        if (!response.ok) throw new Error(`${response.status}`);

        return arrayMessages;
    } catch (err) {
        console.error(err);
    }
}

// eslint-disable-next-line no-magic-numbers
export async function renderHistoryMessages(token: string, length: number = 20) {
    const data = await getHistoryMessages(token);
    
    if (!data) return;
    if (!main.chatClientWindow) return;

    const arr = data.slice(0, length);
    
    new Storage('allMessages', JSON.stringify(arr));

    main.chatClientWindow.innerHTML = '';

    arr.forEach((message: Message) => {
        const text = message.text;
        const name = message.user.name;
        const time = toDate(message.createdAt);
        const outgoingEmail = Cookies.get('email');
        
        if (message.user.email === outgoingEmail) {
            assigningValuesToTheMessage(text, true, name, time);
        } else {
            assigningValuesToTheMessage(text, false, name, time);
        }
    });
}
