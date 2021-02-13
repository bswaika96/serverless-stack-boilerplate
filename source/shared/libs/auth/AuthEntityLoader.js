import DynamoDB, {ParamsBuilder, DocumentParser} from '../db/DynamoDB';
import AppError, {ResourceNotFoundError} from '../errors/AppErrors';
import { formatJSON } from '../utils/JSON';

export default class AuthEntityLoader{
    constructor(client, tableName, entity){
        this.db = new DynamoDB(client);
        this.params = new ParamsBuilder(tableName);
        this.entity = entity;
    }

    async loadEntity(request){
        const params = this.params.buildQueryParams('authEntityLoader', {
            entityType: this.entity,
            firebaseId: request.getProp('firebaseId')
        });
        const result = await this.db.query(params).catch((error) => {
            console.error(formatJSON(error));
            throw new AppError(500, 'Database Error');
        });
        if(result.Count == 0){
            throw new ResourceNotFoundError(this.entity);
        }
        const entity = new DocumentParser(result.Items[0]).parse();
        entity.entityType = this.entity;
        request.addProp('entity', entity);
    }
}