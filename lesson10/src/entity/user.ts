import { Column, Entity, OneToMany } from 'typeorm';
import { CommonFields } from './commonFields';
import { IPost, Post } from './post';
import { Comment } from './comments';

export interface IUser {
    id:number;
    firstName: string;
    lastName: string;
    age?: number;
    phone: string;
    email: string;
    password: string;
    posts: IPost[];
    comments: Comment[];

}

@Entity('Users', { database: 'express_okten' })
export class User extends CommonFields implements IUser {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,

    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        lastName: string;

    @Column({
        type: 'int',

    })
        age?: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,

    })
        phone: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: false,

    })
        email: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        password: string;

    @OneToMany(() => Post, (post) => post.user)
        posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
        comments:Comment[];
}
