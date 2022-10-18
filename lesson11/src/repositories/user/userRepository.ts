import {
    DeleteResult,
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IUser, User } from '../../entity';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager()
            .getRepository(User)
            .save(user);
    }

    public async getAllUsers(): Promise<IUser[]> {
        return getManager()
            .getRepository(User)
            .find({ relations: ['posts', 'comments'] });
    }

    public async getUserById(id: number): Promise<IUser|undefined> {
        return getManager()
            .getRepository(User)
            .findOne({ id });
    }

    public async updateUserById(id: number, password: string, email: string):
        Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .update({ id }, {
                password,
                email,
            });
    }

    public async deleteUserById(id:number):Promise<DeleteResult> {
        return getManager().getRepository(User).softDelete({ id });
    }

    public async getUserByEmail(email:string):Promise<IUser|undefined> {
        return getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.email=:email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async updateUserByParams(id: number, user:Partial<IUser>):
        Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .update({ id }, user);
    }
}
export const userRepository = new UserRepository();
