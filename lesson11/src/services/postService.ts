import { UpdateResult } from 'typeorm';
import { IPost } from '../entity';
import { postRepository } from '../repositories/post/postRespository';

class PostService {
    public async getAllPosts():Promise<IPost[]> {
        return postRepository.getAllPosts();
    }

    public async getOneUserPost(userId:number):Promise<IPost | undefined> {
        return postRepository.getUsersPost(userId);
    }

    public async updatePostById(id:number, text:string):Promise<UpdateResult> {
        return postRepository.updatePostById(id, text);
    }

    async getPostPagination(filterObject: any, page: number, perPage: number) {
        return postRepository.getPostsPagination(filterObject, +page, +perPage);
    }
}

export const postService = new PostService();
