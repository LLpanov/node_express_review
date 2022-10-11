import { IToken } from '../../entity';
import { ITokenDataToSave } from '../../interfaces';
import { DeleteResult } from 'typeorm';

export interface ITokenRepository {
    createToken(token: ITokenDataToSave):Promise<IToken>;
    findTokenByUser(userId: number): Promise<IToken | undefined>;
    deleteByParams(findObject:Partial<IToken>):Promise<DeleteResult>

}
