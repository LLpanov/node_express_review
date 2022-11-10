import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';
import { config } from '../config';

export interface IToken {
    userId: number;
    accessToken:string
    refreshToken: string;

}

@Entity('Tokens', { database: config.MYSQL_DATABASE_NAME })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,

    })
        refreshToken: string;

    @Column({
        type: 'int',

    })
        userId: number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,

    })
        accessToken: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
