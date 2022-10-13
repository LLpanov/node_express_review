import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';
import { IPost } from '../entity';
import { postService } from '../services';

class PostController {
    public async getAllPosts(req:Request, res:Response):Promise<Response <IPost[]>> {
        const posts = await postService.getAllPosts();
        return res.json(posts);
    }

    public async getPostByUser(req:Request, res:Response):Promise<Response<IPost>> {
        const { userId } = req.params;
        const onePost = await postService.getOneUserPost(Number(userId));
        return res.json(onePost);
    }

    public async updatePostbyId(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { id } = req.params;
        const { text } = req.body;
        const updatePost = await postService.updatePostById(Number(id), text);
        return res.json(updatePost);
    }
}
export const postController = new PostController();
