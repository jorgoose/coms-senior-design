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

type Game = {
    AppID: number;
    Name: string;
    description: string;
    "Header image": string;
    "About the game": string;
    Developers: string;
}