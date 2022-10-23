import { DeleteResult, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { IUser } from '../entity';
import { userRepository } from '../repositories/user/userRepository';
import { config } from '../config';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const dataToSave = {
            ...user,
            password: hashedPassword,
        };

        return userRepository.createUser(dataToSave);
    }

    public async getAlluser(): Promise<IUser[]> {
        return userRepository.getAllUsers();
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return userRepository.getUserById(id);
    }

    // eslint-disable-next-line max-len
    public async updateByUserId(id: number, email: string, password: string): Promise<UpdateResult> {
        return userRepository.updateUserById(id, email, password);
    }

    public async deleteByUserId(id: number): Promise<DeleteResult> {
        return userRepository.deleteUserById(+id);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }

    public async compareUserPassword(password: string, hash: string): Promise<void | Error> {
        const isPasswordsUnique = await bcrypt.compare(password, hash);

        if (!isPasswordsUnique) {
            throw new Error('User not exists');
        }
    }

    public async forgotPassword(id: number, obj: Partial<IUser>): Promise<object| undefined> {
        if (obj.password) {
            obj.password = await this._hashPassword(obj.password);

        }
        return userRepository.updateUserByParams(id, obj);
    }

    public async getUserPagination(filterObject:any, page:number, perPage:number) {
        return userRepository.getUserPagination(filterObject, +perPage, +page);
    }
}
export const userService = new UserService();
