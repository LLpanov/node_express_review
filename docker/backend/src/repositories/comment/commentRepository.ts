import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { Comment, IComment } from '../../entity/comments';
import { ICommentRepository } from './commentRepository.interface';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async getAllComments(): Promise<IComment[]> {
        return getManager()
            .getRepository(Comment)
            .find();
    }

    public async getCommentsById(id: number): Promise<IComment | object> {
        return getManager()
            .getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.user', { id })
            .leftJoinAndSelect('comment.user', 'user')
            .getMany();
    }

    // eslint-disable-next-line consistent-return
    public async getLikeDislike(commentId:number, action:string)
        :Promise<undefined|UpdateResult|Error> {
        try {
            const queryRunner = getManager().getRepository(Comment);
            const comment = await queryRunner.createQueryBuilder('comment')
                .where('comment.id = :id', { id: commentId })
                .getOne();
            if (!comment) {
                throw Error('wrong commentId');
            }
            if (action === 'like') {
                return queryRunner.update({ id: commentId }, { like: comment.like + 1 });
            }
            if (action === 'dislike') {
                return queryRunner.update({ id: commentId }, { dislike: comment.dislike + 1 });
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const commentRepository = new CommentRepository();
