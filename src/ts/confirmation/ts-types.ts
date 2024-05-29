export type ConfirmationWindow = {
    modal: HTMLElement | null;
    formSubmitEmail: HTMLFormElement | null;
    tokenInput: HTMLFormElement | null;
    loader: HTMLElement | null;
};

export interface userData {
    email: string;
    name: string;
    token: string;
    __v: number;
    _id: string
}
