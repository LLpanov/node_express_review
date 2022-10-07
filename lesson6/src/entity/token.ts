import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { User } from './user';

export interface IToken {
    userId: number;
    refreshToken: string;

}

@Entity('Tokens', { database: 'express_okten' })
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

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
