import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../../entity/user';

export interface IUserRepository{
    createUser(user: IUser): Promise<IUser>;

    getAllUsers(): Promise<IUser[]>;

    getUserById(id: number): Promise<any>;

    updateUserById(id: number, email:string, password:string): Promise<UpdateResult>;

    deleteUserById(id: number): Promise<DeleteResult>;

    getUserByEmail(email: string): Promise<IUser | undefined>;
}
