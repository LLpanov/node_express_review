import { UpdateResult } from 'typeorm';
import { IPost } from '../entity/post';
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
}

export const postService = new PostService();
