export interface UserRequest {
	id: number;
	email: string;
	role: string;
}

declare global {
	namespace Express {
		export interface User extends UserRequest {}
	}
}

export {};
