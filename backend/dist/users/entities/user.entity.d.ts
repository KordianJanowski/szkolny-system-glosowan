import { Role } from "../../roles/role.enum";
export declare class User {
    id: number;
    name: string;
    surname: string;
    login: string;
    class: string;
    roles?: Role[];
    votingsIds?: number[];
    created_at: Date;
}
