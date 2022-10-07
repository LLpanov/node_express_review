import { IToken } from '../../entity/token';

export interface ITokenRepository {
    createToken(token: string): Promise<IToken>;
    findTokenByUser(userId: number): Promise<IToken | undefined>
}
