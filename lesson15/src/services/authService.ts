import { IUser } from '../entity';
import { tokenService } from './tokenService';
import { ITokenData } from '../interfaces';

class AuthService {
    public async registration(createdUser:IUser):Promise<ITokenData> {
        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData:IUser):Promise<ITokenData> {
        const { id, email } = userData;
        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokenPair.refreshToken, tokenPair.accessToken);

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,

        };
    }
}

export const authService = new AuthService();
