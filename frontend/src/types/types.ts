type User = {
    id: string | undefined,
    aud: string | undefined,
    role?: string | undefined,
    email?: string | undefined,
    email_confirmed_at?: string | undefined,
    phone?: string | undefined,
    confirmed_at?: string | undefined,
    last_sign_in_at?: string | undefined,
    app_metadata: {},
    user_metadata: {},
    identities?: UserIdentity[] | undefined,
    created_at: string | undefined,
    updated_at?: string | undefined,
    username?: string | undefined,
    profilePic?: string | undefined,
    bio?: string | undefined,
    account_type?: number | undefined,
}

type UserIdentity = {
    identity_id: string | undefined,
    id: string | undefined,
    user_id: string | undefined,
    identity_data?: { [key: string]: any; } | undefined,
    provider: string | undefined,
    last_sign_in_at?: string | undefined,
    created_at?: string | undefined,
    updated_at?: string | undefined,
    email?: string | undefined,
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
    "Release date": string;
    Price: string;
    Positive: number;
    Negative: number;
    Recommendations: number;
}

type GameConcept = {
    id?: string;
    title?: string;
    UserID: string;
    description?: string;
    genre?: string[];
    tags?: string[];
}

type FavoriteGame = {
    id?: string;
    AppID?: number;
    UserID?: string;
}

type gameByDeveloperArgs = {
    id?: string;
    select: string;
    column: string;
    equal: string;
}

type Review = {
    id?: string;
    UserID: string;
    ConceptID: string;
    comment: string;
    vote: number;
}