import jwt from 'jsonwebtoken';
import { config } from '../config';
import { IToken } from '../entity';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { ITokenPair, IUserPayload } from '../interfaces';

class TokenService {
    public async generateTokenPair(payload: IUserPayload):
        Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );
        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId:number, refreshToken:string, accessToken:string):Promise<IToken> {
        const tokenFromDB = await tokenRepository.findTokenByUser(userId);
        if (tokenFromDB) {
            tokenFromDB.refreshToken = refreshToken;
            tokenFromDB.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDB);
        }

        return tokenRepository.createToken({
            accessToken,
            refreshToken,
            userId,
        });
    }

    public async deleteTokenPair(userId:number) {
        return tokenRepository.deleteByParams({ userId });
    }

    public async verifyToken(authToken: string, tokenType = 'access'): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }
        if (tokenType === 'action') {
            secretWord = config.SECRET_ACTION_KEY;
        }

        return jwt.verify(authToken, secretWord as string)as IUserPayload;
    }

    async deleteTokenPairByParams(object:Partial<IToken>) {
        return tokenRepository.deleteByParams(object);
    }

    public generateActionToken(payload: IUserPayload): string {
        return jwt.sign(payload, config.SECRET_ACTION_KEY, { expiresIn: config.EXPIRES_IN_ACTION });
    }
}

export const tokenService = new TokenService();
