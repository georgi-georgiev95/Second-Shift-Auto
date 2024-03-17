export interface UserReg {
    username: string,
    email: string,
    passGroup: {
        password: string,
        rePassword: string
    },
    error?: string
}

export interface UserLogin {
    email: string,
    password: string,
    error?: string
}

export interface AuthRes {
    email?: string,
    userId?: string,
    username?: string,
    error?: string
}

export interface Profile {
    username: string,
    email: string
}