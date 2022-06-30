export interface User {
    user_name: string
    first_name: string
    last_name: string
    email: string
    su: string
    password: string
    is_active: boolean
    created_at: Date
    updated_at: Date
}
export interface TokensEmail {
    user_email: string
    token: string
    created_at: Date
    updated_at: Date
}