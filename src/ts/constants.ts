import { Classes, Url } from './chat-main-window/ts-types';

export const classes: Classes = {
    message: {
        myMessage: 'window__message-me',
        otherMessage: 'window__message-other',
        blockMessage: 'window__message',
        addMessage: 'message-add',
        addComplete: 'message-add-complete',
    },

    error: {
        authorization: 'error-style-normal',
    },
};

export const URL: Url = {
    authorizationAPI: 'https://edu.strada.one/api/user',
    pathMe: '/me',
    pathMessage: 'https://edu.strada.one/api/messages/ ',
    webSocketUrl: 'wss://edu.strada.one/websockets?',
};

export const loaderHTML = `
<div class="bar1"></div>
<div class="bar2"></div>
<div class="bar3"></div>
<div class="bar4"></div>
<div class="bar5"></div>
<div class="bar6"></div>
<div class="bar7"></div>
<div class="bar8"></div>
<div class="bar9"></div>
<div class="bar10"></div>
<div class="bar11"></div>
<div class="bar12"></div>`;
