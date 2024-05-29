import { SettingsElements } from './ts-types';

export const settings: SettingsElements = {
    container: document.querySelector('.settings'),
    inputName: document.querySelector('#changeName'),
    btn: {
        close: document.querySelector('.settings__btn-close'),
        formSubmitName: document.querySelector('.settings__form'),
    },
    loader: document.querySelector('.settings__window > .loader'),
};
