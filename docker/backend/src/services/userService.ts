import { DeleteResult, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';
import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        const createdUser = await userRepository.createUser(dataToSave);
        return createdUser;
    }

    public async getAlluser():Promise<IUser[]> {
        const getAllusers = await userRepository.getAllUsers();
        return getAllusers;
    }

    public async getUserById(id:number):Promise<IUser> {
        const getOneUser = await userRepository.getUserById(id);
        return getOneUser;
    }

    public async updateByUserId(id:number, email:string, password:string):Promise<UpdateResult> {
        const updateUser = await userRepository.updateUserById(id, email, password);
        return updateUser;
    }

    public async deleteByUserId(id:number):Promise<DeleteResult> {
        const deleteUser = await userRepository.deleteUserById(+id);
        return deleteUser;
    }

    public async getUserByEmail(email:string):Promise<IUser|undefined> {
        const getByEmail = await userRepository.getUserByEmail(email);
        return getByEmail;
    }

    private async _hashPassword(password:string):Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
