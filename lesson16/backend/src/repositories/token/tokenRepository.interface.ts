import { DeleteResult } from 'typeorm';
import { IToken } from '../../entity';
import { ITokenDataToSave } from '../../interfaces';

export interface ITokenRepository {
    createToken(token: ITokenDataToSave):Promise<IToken>;
    findTokenByUser(userId: number): Promise<IToken | undefined>;
    deleteByParams(findObject:Partial<IToken>):Promise<DeleteResult>

}
