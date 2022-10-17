import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IPost, Post } from '../../entity';
import { IPostRepository } from './postRepository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post>implements IPostRepository {
    public async getAllPosts():Promise<IPost[]> {
        return getManager().getRepository(Post).find({ relations: ['comments'] });
    }

    public async getUsersPost(userId:number):Promise<Post | undefined> {
        return getManager().getRepository(Post).findOne({ userId });
    }

    public async updatePostById(id:number, text:string):Promise<UpdateResult> {
        return getManager()
            .getRepository(Post)
            .update({ id }, { text });
    }
}
export const postRepository = new PostRepository();
