import APIResponse from './APIResponse';
import APIRequest from './APIRequest';

export default function handler(lambda, options){
    return async function(event, context){
        let response = { success: true }, status;

        try{
            const request = new APIRequest(event, context);

        } catch(error){
            const {status, ...error} = error;
            response.responseObject = error;
            status = status;
        }

        return new APIResponse(status, response);
    }
}