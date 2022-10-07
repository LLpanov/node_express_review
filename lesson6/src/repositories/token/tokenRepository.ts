import { getManager, EntityRepository, Repository } from 'typeorm';
import { IToken, Token } from '../../entity/token';
import { ITokenRepository } from './tokenRepository.interface';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token: any): Promise<IToken> {
        return getManager()
            .getRepository(Token)
            .save(token);
    }

    public async findTokenByUser(userId: number): Promise<IToken | undefined> {
        return getManager()
            .getRepository(Token)
            .findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();
