export interface IResponse<T> {
    status: boolean;
    data: T;
    message: any;
    status_code: number;
}

export interface IUserExists {
    user_exists: boolean
}

export interface ILogin {
    token?: string
}
