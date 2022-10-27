import { UpdateResult } from 'typeorm';

import { IPost } from '../entity';
import { postRepository } from '../repositories/post/postRespository';
import { userRepository } from '../repositories/user/userRepository';

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

    public async getPostPagination(filterObject:any, page:number, perPage:number) {
        return userRepository.getUserPagination(filterObject, +perPage, +page);
    }
}

export const postService = new PostService();
