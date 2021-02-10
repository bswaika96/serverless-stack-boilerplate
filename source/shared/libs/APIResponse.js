export default class APIResponse{
    constructor(status, {success, responseObject}){
        this.statusCode = status;
        let body = { success };
        if(success){
            body.data = responseObject;
        } else {
            body.error = responseObject;
        }
        this.body = JSON.stringify(body);
        this.headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
    }
}