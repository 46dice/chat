import Cookies from 'js-cookie';
import { classes, URL } from '../constants';
import { error } from '../string-errors';
import { closeModal, showElement, hideElement } from '../page-operations';
import { settings } from './elements';
import { requestChangeName } from './request';

function handleCloseSettings(e: Event) {
    const { target } = e;
    const clickOnTarget = target === settings.btn.close || target === settings.container;

    if (clickOnTarget) {
        if (!settings.container) return;
        closeModal(settings.container);
    }
}

async function handleChangeName(e: Event) {
    e.preventDefault();

    const { loader } = settings;
    const url = URL.authorizationAPI;
    const name = settings.inputName?.value;
    Cookies.set('name', name);
    const token = Cookies.get('token');
    const email = Cookies.get('email');

    if (!token || !email) return;
    if (!loader) return;

    showElement(loader);
    try {
        const response = await requestChangeName(url, email, name, token);

        if (response.ok) {
            hideElement(loader);
            closeModal(settings.container!);
            alert('good name bruh');
        } else {
            throw new Error(`${response.status}`);
        }
    } catch (err) {
        loader.innerHTML = '';
        loader.textContent = error.authorization + err;
        loader.classList.add(classes.error.authorization);

        const warningTime = 2000;

        setTimeout(() => {
            hideElement(loader);
        }, warningTime);
        console.error(err);
    }
}

settings.container?.addEventListener('click', handleCloseSettings);
settings.btn.formSubmitName?.addEventListener('submit', handleChangeName);
