import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { IPost, Post } from '../../entity';
import { IPostRepository } from './postRepository.interface';
import { IPaginationResponse } from '../../interfaces';

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

    public async getUserPagination(
        searchObject:Partial<IPost> = {},
        limit:number = 25,
        page:number = 1,
    )
        : Promise<IPaginationResponse<IPost>> {
        const skip = limit * (page - 1);
        const [posts, itemCount] = await getManager()
            .getRepository(Post)
            .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemCount,
            data: posts,
        };
    }
}
export const postRepository = new PostRepository();
