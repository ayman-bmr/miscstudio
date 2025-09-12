import { UserType } from "../interfaces/userType";

export function mapUserToUserType(user: any): UserType {
    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        email: user.email,
    };
}