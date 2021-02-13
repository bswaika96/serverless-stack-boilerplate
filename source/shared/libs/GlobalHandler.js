import APIResponse from './APIResponse';
import APIRequest from './APIRequest';
import AppError, { BadRequestError } from './AppErrors';

export default function handler(lambda, options = undefined){
    return async function(event, context){
        let response = { success: true }, status;

        try{
            const request = new APIRequest(event, context);
            if(options && options.auth){
                if(!request.hasAuthHeader()) throw new BadRequestError('400');
            }

        } catch(error){
            response.success = false;
            response.responseObject = error.getResponse();
            status = error.getStatus();
        }

        return new APIResponse(status, response);
    }
}