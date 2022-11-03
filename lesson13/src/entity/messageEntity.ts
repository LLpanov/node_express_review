import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { CommonFields, ICommonFields } from './commonFields';
import { config } from '../config';
import { User } from './user';

export interface IMessage extends ICommonFields{
    userId: number;
    message: string;
}

@Entity('Messages', { database: config.MYSQL_DATABASE_NAME })
export class Message extends CommonFields implements IMessage {
    @Column({
        type: 'int',

    })
        userId: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,

    })
        message: string;

@OneToOne(() => User)
   @JoinColumn({ name: 'userId' })
    user:User;
}
