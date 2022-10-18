import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { IToken, Token } from '../../entity';
import { ITokenRepository } from './tokenRepository.interface';
import { ITokenDataToSave } from '../../interfaces';

@EntityRepository(Token)
class TokenRepository extends Repository<Token>
    implements ITokenRepository {
    public async createToken(token: ITokenDataToSave):
        Promise<IToken> {
        return getManager()
            .getRepository(Token)
            .save(token);
    }

    public async findTokenByUser(userId: number): Promise<IToken | undefined> {
        return getManager()
            .getRepository(Token)
            .findOne({ userId });
    }

    public findByParams(filterObject:Partial<IToken>):Promise<IToken|undefined> {
        return getManager().getRepository(Token).findOne(filterObject);
    }

    public async deleteByParams(findObject:Partial<IToken>):Promise<DeleteResult> {
        return getManager().getRepository(Token).delete(findObject);
    }
}

export const tokenRepository = new TokenRepository();
