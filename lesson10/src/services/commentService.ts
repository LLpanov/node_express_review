import { UpdateResult } from 'typeorm';
import { IComment } from '../entity';
import { commentRepository } from '../repositories/comment/commentRepository';

class CommentService {
    public async getAllComments():Promise<IComment[]> {
        return commentRepository.getAllComments();
    }

    public async getCommentById(id:number):Promise<IComment|object> {
        return commentRepository.getCommentsById(+id);
    }

    public async getLikeDieslike(commentId:number, action:string)
        :Promise<undefined|UpdateResult|Error> {
        return commentRepository.getLikeDislike(commentId, action);
    }
}

export const commentService = new CommentService();
