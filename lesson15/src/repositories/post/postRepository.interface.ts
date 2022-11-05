import { UpdateResult } from 'typeorm';
import { IPost, Post } from '../../entity';

export interface IPostRepository {
    getAllPosts():Promise<IPost[]> ;

    getUsersPost(userId: number): Promise<Post | undefined>;

    updatePostById(userId: number, text: string): Promise<UpdateResult>;
}
