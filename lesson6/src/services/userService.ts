import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user:IUser):Promise<IUser> {
        const createdUser = await userRepository.createUser(user);
        return createdUser;
    }
}

export const userService = new UserService();
