import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';
import { Post } from './post';

export interface IComment {
    text: string;
    postId: number;
    authorId:number;
    like:number;
    dislike: number;

}

@Entity('Comments', { database: 'express_okten' })
export class Comment extends CommonFields implements IComment {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,

    })
        text: string;

    @Column({
        type: 'int',

    })
        authorId: number;

    @Column({
        type: 'int',
    })
        postId: number;

    @Column({
        type: 'int',

    })
        like: number;

    @Column({
        type: 'int',

    })
        dislike: number;

@ManyToOne(() => User, (user) => user.comments)
@JoinColumn({ name: 'authorId' })
    user:User;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post: Post;
}
