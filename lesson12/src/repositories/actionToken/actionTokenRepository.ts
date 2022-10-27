import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';
import { ActionToken, IActionToken, IActionTokenForSave } from '../../entity/actionToken';
import { IActionTokenRepository } from './actionTokenRepository.interface';

@EntityRepository(ActionToken)
class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
    async createActionToken(token:IActionTokenForSave):Promise<ActionToken> {
        return getManager().getRepository(ActionToken).save(token);
    }

    async findByParams(filterObject:Partial<IActionToken>):Promise<IActionToken|undefined> {
        return getManager().getRepository(ActionToken).findOne(filterObject);
    }

    async deleteByParams(findObject:Partial<IActionToken>):Promise<DeleteResult> {
        return getManager().getRepository(ActionToken).delete(findObject);
    }
}

export const actionTokenRepository = new ActionTokenRepository();
