import { Roles } from "./user.model";

export interface UserRequest {
	id: number;
	email: string;
	role: Roles;
}

declare global {
	namespace Express {
		export interface User extends UserRequest {}
	}
}

export {};
