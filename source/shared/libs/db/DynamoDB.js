export default class DynamoDB {
    constructor(client){
        this._client = client;
    }

    getOne(params){
        return this._client.getItem(params).promise();
    }

    putOne(params){
        return this._client.putItem(params).promise();
    }

    updateOne(params){
        return this._client.updateItem(params).promise();
    }

    deleteOne(params){
        return this._client.deleteItem(params).promise();
    }

    scan(params){
        return this._client.scan(params).promise();
    }

    query(params){
        return this._client.query(params).promise();
    }
}

/**
 * ParamsBuilder Helper - can be optionally
 *                        used to construct common
 *                        param patterns
 * This class can either have two types of member functions:
 *      1. builders which implement the pattern logic to manipulate this.params
 *          - should be named build<patternName>Pattern
 *      2. switchers which call appropriate builders and return this.params
 *          - should be name build<operationName>Params
 */

export class ParamsBuilder {
    constructor(tableName){
        this.params = {
            TableName: tableName
        };
    }

    buildAuthEntityLoaderPattern(data){
        this.params.KeyConditionExpression = '#PK = :partitionKey AND begins_with(#SK, :sortKey)';
        this.params.ExpressionAttributeNames = {
            '#PK': 'partitionKey',
            '#SK': 'sortKey'
        };
        this.params.ExpressionAttributeValues = {
            ':partitionKey': {
                'S': `Firebase:${data.firebaseId}`
            },
            ':sortKey': {
                'S': `::${data.entityType}:`
            }
        };
    }

    buildQueryParams(pattern, data){
        switch(pattern){
            case 'authEntityLoader':
                this.buildAuthEntityLoaderPattern(data);
                break;
            default:
                break;
        }
        return this.params;
    }
}

/**
 * DynamoDB Interface Helper - can be used to
 *                        build and parse
 *                        DynamoDB records.
 * This class expects to be passed in the AWS.DynamoDB.Converter
 * module into its constructor.
 */

export class DynamoDBInterface {
    constructor(Converter, options = {
        convertEmptyValues: false,
        wrapNumbers: false
    }){
        this._converter = Converter;
        this.options = options;
    }

    parse(data){
        return this._converter.unmarshall(data, this.options);
    }

    build(data){
        return this._converter.marshall(data, this.options);
    }
}