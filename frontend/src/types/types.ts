type User = {
    id?: number
    username: string
    email: string
    password: string
    account_type: number
    created_at?: Date
    last_login?: Date
}

type SignUpUser = {
    email: string
    password: string
    options: {
        data: {
            username: string
            account_type: number
        }
    }
}

type LoginUser = {
    email: string
    password: string
}