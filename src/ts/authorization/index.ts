import Cookies from 'js-cookie';
import { closeModal, openModal, showElement, hideElement } from '../page-operations';
import { URL, classes } from '../constants';
import { error } from '../string-errors';
import { confirmationWindow } from '../confirmation/elements';
import { authorizationWindow } from './elements';
import { sendTokenOnTheEmail } from './request';

async function handleClickGetToken(e: Event) {
    e.preventDefault();
    const { loader } = authorizationWindow;
    const url = URL.authorizationAPI;
    const email = authorizationWindow.email?.value.trim();

    if (!loader) return;
    if (!authorizationWindow.modal || !confirmationWindow.modal) return;

    showElement(loader);

    try {
        const response = await sendTokenOnTheEmail(url, email);

        if (response.ok) {
            hideElement(loader);
            closeModal(authorizationWindow.modal);
            openModal(confirmationWindow.modal);
            Cookies.set('email', email);
        } else {
            loader.innerHTML = '';
            loader.textContent = error.authorization;
            loader.classList.add(classes.error.authorization);

            const warningTime = 2000;

            setTimeout(() => {
                hideElement(loader);
            }, warningTime);
        }
    } catch (err) {
        console.error(err);
    }
}

function handleClickSignIn(e: Event) {
    e.preventDefault();

    if (!authorizationWindow.modal || !confirmationWindow.modal) return;
    closeModal(authorizationWindow.modal);
    openModal(confirmationWindow.modal);
}

authorizationWindow.getToken?.addEventListener('click', handleClickGetToken);
authorizationWindow.addToken?.addEventListener('click', handleClickSignIn);
