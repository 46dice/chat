import { ConfirmationWindow } from './ts-types';

export const confirmationWindow: ConfirmationWindow = {
    modal: document.querySelector('.confirmation'),
    formSubmitEmail: document.querySelector('.confirmation__form'),
    tokenInput: document.querySelector('#confirmation-token'),
    loader: document.querySelector('.confirmation__window > .loader'),
};
