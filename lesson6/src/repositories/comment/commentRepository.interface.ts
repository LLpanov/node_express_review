import { UpdateResult } from 'typeorm';
import { IComment } from '../../entity/comments';

export interface ICommentRepository {
    getAllComments(): Promise<IComment[]>;
    getCommentsById(id: number): Promise<IComment | object>;
     getLikeDislike(commentId:number, action:string):Promise<undefined|UpdateResult|Error>
}
