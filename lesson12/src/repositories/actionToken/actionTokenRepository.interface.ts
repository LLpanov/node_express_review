import { DeleteResult } from 'typeorm';
import { IActionToken } from '../../entity/actionToken';

export interface IActionTokenRepository {
    createActionToken(token:IActionToken):Promise<IActionToken>;
    findByParams(filterObject: Partial<IActionToken>): Promise<IActionToken | undefined>;
    deleteByParams(findObject:Partial<IActionToken>):Promise<DeleteResult>;

}
