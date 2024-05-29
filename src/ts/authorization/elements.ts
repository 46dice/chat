import { elementsForm } from './ts-types';

export const authorizationWindow: elementsForm = {
    modal: document.querySelector('.authorization'),
    formSubmitEmail: document.querySelector('.authorization__form'),
    email: document.querySelector('#authorization-email'),
    addToken: document.querySelector('.authorization__submit--add-token'),
    getToken: document.querySelector('.authorization__submit--get-token'),
    loader: document.querySelector('.authorization__window > .loader'),
};
