export default class APIRequest{
    constructor(event, context){
        this.body = JSON.parse(event.body);
        this.params = event.pathParameters;
        this.headers = event.headers;
        this.query = event.queryStringParameters;
        if(context.clientContext){
            this.clientContext = context.clientContext;
        }
        this._props = {};
    }

    addProp(property, value){
        this._props[property] = value;
    }

    getProp(property){
        return this._props[property] ? this._props[property] : undefined;
    }

    hasClientContext(){
        return this.clientContext ? true : false;
    }

    hasBody(){
        return this.body ? true : false; 
    }

    hasParams(){
        return this.params ? true : false;
    }

    hasHeaders(){
        return this.headers ? true : false;
    }

    hasAuthHeader(){
        return this.hasHeaders() ? (this.headers.Authorization && typeof this.headers.Authorization === 'string' ? true : false): false; 
    }

    hasQuery(){
        return this.query ? true : false; 
    }
}