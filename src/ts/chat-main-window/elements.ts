import { Main, SettingsElements } from './ts-types';

export const main: Main = {
    btn: {
        settings: document.querySelector('.chat__btn-settings'),
        exit: document.querySelector('.chat__btn-exit'),
        form: document.querySelector('.chat__form-add-message'),
    },
    input: document.querySelector('.chat__form-input'),
    chatClientWindow: document.querySelector('.window-body'),
    chatWindow: document.querySelector('.chat__window'),
    chat: document.querySelector('.chat'),
    loader: document.querySelector('.loader__wrapper');
};

export const settings: SettingsElements = {
    container: document.querySelector('.settings'),
    btn: {
        close: document.querySelector('.settings__btn-close'),
        formSubmitName: document.querySelector('.settings__form'),
    },
};

export const message = {
    template: document.querySelector('#message') as HTMLTemplateElement | null,
};
