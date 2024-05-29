/* eslint-disable import/order */
import { confirmationWindow } from './elements';
import Cookies from 'js-cookie';
import { getUser } from './request';
import { URL, classes, loaderHTML } from '../constants';
import { showElement, hideElement, closeModal, openModal, scrollToMessage } from '../page-operations';
import { main } from '../chat-main-window/elements';
import { socketHandle } from '../chat-main-window/socket';
import { error } from '../string-errors';
import { renderHistoryMessages } from '../chat-main-window/render-history-messages';
import { userData } from './ts-types';

async function handleLogIn(e: Event) {
    e.preventDefault();

    const { loader } = confirmationWindow;
    const inputToken = confirmationWindow.tokenInput?.value.trim().toString();
    const url = URL.authorizationAPI + URL.pathMe;
    Cookies.set('token', inputToken);

    if (!confirmationWindow.modal || !main.chat) return;
    if (!loader) return;

    try {
        loader.classList.remove(classes.error.authorization);
        loader.innerHTML = loaderHTML;
        showElement(loader);

        const token = Cookies.get('token')!;
        const response = await getUser(url, token);

        if (response.ok) {
            closeModal(confirmationWindow.modal);
            openModal(main.chat);
            const data: userData = await response.json();
            Cookies.set('name', data.name);
            Cookies.set('email', data.email);
            await renderHistoryMessages(token);
            socketHandle.setToken(token);
            socketHandle.init();
            scrollToMessage();
        } else {
            throw new Error(`${response.status}`);
        }
        hideElement(loader);
    } catch (err) {
        loader.innerHTML = '';
        showElement(loader);
        loader.textContent = `${error.authorization} ${err}`;
        loader.classList.add(classes.error.authorization);

        const warningTime = 2000;

        setTimeout(() => {
            hideElement(loader);
        }, warningTime);
        console.error(err);
    }
}

confirmationWindow.formSubmitEmail?.addEventListener('submit', handleLogIn);
