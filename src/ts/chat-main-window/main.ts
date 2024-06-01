/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-inner-declarations */
import Cookies from 'js-cookie';
import '../../scss/_reset.scss';
import '../../scss/style.scss';
import { confirmationWindow } from '../confirmation/elements';
import { authorizationWindow } from '../authorization/elements';
import { closeModal, openModal, scrollToMessage } from '../page-operations';
import { main, settings } from './elements';
import { socketHandle } from './socket';
import { renderHistoryMessages } from './render-history-messages';

(async function runWithSavedData() {
    const localData = localStorage.getItem('allMessages');
    const checkModals = !authorizationWindow.modal || !confirmationWindow.modal || !main.chat;
    if (checkModals) return;
    if (!localData) return;

    socketHandle.init();
    const token = Cookies.get('token');
    closeModal(authorizationWindow.modal);
    closeModal(confirmationWindow.modal);
    openModal(main.chat);
    await renderHistoryMessages(token!);
    scrollToMessage();
}());

function lazyLoadMessages() {
    let countMessages = 20;

    return function () {
        const messageLoad = 20;
        countMessages += messageLoad;
        return countMessages;
    };
}

const countMessages = lazyLoadMessages();

function handleSubmitOnMessage(e: Event) {
    e.preventDefault();
    const inputMessage = main.input!.value;

    const token = Cookies.get('token');
    if (!token) return;

    const text = JSON.stringify({
        text: `${inputMessage}`,
    });

    socketHandle.sendMessage(text);
    scrollToMessage();

    main.btn.form?.reset();
}

async function handleScrollOnWindowChat() {
    const top = 0;
    const token = Cookies.get('token');
    if (!token) return;

    const chatWindowScrollToTop = main.chatWindow?.scrollTop === top;

    if (chatWindowScrollToTop) {
        const messagesToLoad = countMessages();
        await renderHistoryMessages(token, messagesToLoad);

        const messagesToScroll = 20;
        scrollToMessage(messagesToScroll);
    }
}

function handleExit() {
    socketHandle.close();
    const allCookies = Cookies.get();
    localStorage.clear();

    for (const key in allCookies) {
        Cookies.remove(key.toString());
    }

    if (!main.chat || !authorizationWindow.modal) return;
    closeModal(main.chat);
    openModal(authorizationWindow.modal);
}

main.btn.settings?.addEventListener('click', () => {
    if (!settings.container) return;
    openModal(settings.container);
});

main.btn.form?.addEventListener('submit', handleSubmitOnMessage);
main.btn.form?.addEventListener('keyup', (e) => {
    e.code === 'Enter' ? handleSubmitOnMessage(e) : false;
});
main.chatWindow?.addEventListener('scroll', handleScrollOnWindowChat);
main.btn.exit?.addEventListener('click', handleExit);
