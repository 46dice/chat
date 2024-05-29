interface User {
    email: string;
    name: string;
}

interface Message {
    _id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    __v: number;
}

interface dataFromApi {
    messages: Array<Message> | null | undefined;
}

export { dataFromApi, Message };
