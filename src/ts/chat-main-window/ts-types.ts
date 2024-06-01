export type Classes = {
    message: {
        myMessage: string;
        otherMessage: string;
        blockMessage: string;
        addMessage: string;
        addComplete: string;
    };

    error: {
        authorization: string;
    };
};

export type Main = {
    btn: {
        settings: HTMLButtonElement | null;
        exit: HTMLButtonElement | null;
        form: HTMLFormElement | null;
    };
    chatWindow: HTMLElement | null
    chat: HTMLElement | null;
    input: HTMLInputElement | null;
    chatClientWindow: HTMLElement | null;
    loader: HTMLElement | null;
};

export type SettingsElements = {
    container: HTMLElement | null;
    btn: {
        close: HTMLButtonElement | null;
        formSubmitName: HTMLFormElement | null;
    };
};

export type Url = {
    authorizationAPI: string;
    pathMe: string;
    pathMessage: string;
    webSocketUrl: string
};
