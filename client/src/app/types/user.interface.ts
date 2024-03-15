export interface UserReg {
    username: string,
    email: string,
    passGroup: {
        password: string,
        rePassword: string
    }
}