export interface IAdmin {
    username: string,
    password: string
}

export interface IState {
    admin: IAdmin | null,
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string
}
