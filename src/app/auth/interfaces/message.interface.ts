export interface IMessage {
    name: Array<IMessageItem>;
    email: Array<IMessageItem>;
    device: Array<IMessageItem>;
    confirm_password: Array<IMessageItem>;
    password: Array<IMessageItem>;
    mobile: Array<IMessageItem>;
}

export interface IMessageItem {
    type: string; message: string;
}