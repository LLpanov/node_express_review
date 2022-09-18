import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';

export interface IPost {
    userId: number;
    title: string;
    text: string;

}

@Entity('Posts', { database: 'express_okten' })
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,

    })
        title: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        text: string;

    @Column({
        type: 'int',

    })
        userId: number;

@ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
    user: User;
}
