import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../../entity';

export interface IUserRepository{
    createUser(user: IUser): Promise<IUser>;

    getAllUsers(): Promise<IUser[]>;

    getUserById(id: number): Promise<IUser|undefined>;

    updateUserById(id: number, email:string, password:string, avatar:string): Promise<UpdateResult>;

    deleteUserById(id: number): Promise<DeleteResult>;

    getUserByEmail(email: string): Promise<IUser | undefined>;

    getNewUsers(): Promise<IUser[]>;

    updateUserByAvatar(avatar: any):Promise<UpdateResult>;

   // getUserPagination(searchObject: Partial<IUser> = {}, limit: number = 25, page: number = 1)
        // : Promise<IPaginationResponse<IUser>>;
}
