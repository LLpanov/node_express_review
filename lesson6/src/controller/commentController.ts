import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';
import { IComment } from '../entity/comments';
import { commentService } from '../services/commentService';

class CommentController {
    public async getAllComments(req:Request, res:Response):Promise <Response <IComment[]>> {
        const comments = await commentService.getAllComments();
        return res.json(comments);
    }

    public async getCommentsById(req:Request, res:Response):Promise<Response<IComment>> {
        const { id } = req.params;
        const getComment = await commentService.getCommentById(+id);
        return res.json(getComment);
    }

    public async getLikeDieslike(req:Request, res:Response)
        :Promise<Response<undefined|UpdateResult|Error>> {
        const { commentId, action } = req.body;
        const postLikeDieslike = await commentService.getLikeDieslike(+commentId, action);
        return res.json(postLikeDieslike).sendStatus(201);
    }
}

export const commentController = new CommentController();
