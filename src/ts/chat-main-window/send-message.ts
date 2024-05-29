/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import { classes } from '../constants';
import { message, main } from './elements';
import { Message } from './interfaces-from-api';

type ReturnElements = {
    templateContent: Node | null | undefined;
    templateRoot: HTMLDivElement | null | undefined;
};

function createTemplateMessage() {
    const templateRoot = document.createElement('div');
    const templateContent = message.template?.content.cloneNode(true);
    templateRoot.classList.add(classes.message.blockMessage);

    const returnElements: ReturnElements = {
        templateContent: templateContent,
        templateRoot: templateRoot,
    };

    return returnElements;
}

function getElementsFromTemplate(root: HTMLElement) {
    return {
        userName: root.querySelector('.window__message-body')?.querySelector('.user'),
        userDate: root.querySelector('.window__message-body')?.querySelector('time'),
        userText: root.querySelector('.window__message-body')?.querySelector('#message-text'),
    };
}

export function createMessageFromSocket(data: Message) {
    const { templateRoot, templateContent } = createTemplateMessage();
    if (!templateRoot || !templateContent) return;
    if (!main.chatClientWindow) return;
    const outgoingEmail = Cookies.get('email');
    const emailFromData = data.user.email;
    const newClass = classes.message;

    if (emailFromData === outgoingEmail) {
        templateRoot.classList.add(newClass.myMessage, newClass.addMessage);
    } else {
        templateRoot.classList.add(newClass.otherMessage, newClass.addComplete, newClass.addMessage);
    }

    main.chatClientWindow.append(templateRoot);
    templateRoot.append(templateContent);

    const { userName, userDate, userText } = getElementsFromTemplate(templateRoot);

    const checkValuesFromUser = !userName || !userDate || !userText;
    if (checkValuesFromUser) return;

    userName.textContent = data.user.name;
    userDate.textContent = format(data.createdAt, 'HH:mm');
    userText.textContent = data.text;
}

export function assigningValuesToTheMessage(text: string, outgoing: boolean, name: string, date = new Date()) {
    const { templateRoot, templateContent } = createTemplateMessage();
    if (!templateRoot || !templateContent) return;
    if (!main.chatClientWindow) return;

    const newClass = classes.message;

    if (outgoing) {
        templateRoot.classList.add(newClass.myMessage, newClass.addMessage);
    } else {
        templateRoot.classList.add(newClass.otherMessage, newClass.addComplete, newClass.addMessage);
    }

    main.chatClientWindow.append(templateRoot);
    templateRoot.append(templateContent);

    const { userName, userDate, userText } = getElementsFromTemplate(templateRoot);

    const checkValuesFromUser = !userName || !userDate || !userText;
    if (checkValuesFromUser) return;

    const dateNow = date;
    userName.textContent = name;
    userText.textContent = text;
    userDate.textContent = format(dateNow, 'HH:mm');

    main.chatClientWindow.insertAdjacentElement('afterbegin', templateRoot);
}
