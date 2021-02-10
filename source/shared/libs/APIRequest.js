export default class APIRequest{
    constructor(event, context){
        this.body = JSON.parse(event.body);
        this.params = event.pathParameters;
        this.headers = event.headers;
        this.query = event.queryStringParameters;
        if(context.clientContext){
            this.clientContext = context.clientContext;
        }
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

    hasQuery(){
        return this.query ? true : false; 
    }
}