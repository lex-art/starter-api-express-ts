
export interface UserToken {
    userName?: string;
    fisrtName?: string;
    lastName?: string;
    email?: string;
    role?: Array<string>;
    iat?: number;
    exp?: number
  }
export interface CheckUser {
	error?: boolean | Error;
	message?: string;
	user?: UserToken;
	accessToken?: string;
}