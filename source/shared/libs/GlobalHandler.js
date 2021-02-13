import APIResponse from './api/APIResponse';
import APIRequest from './api/APIRequest';
import AuthProvider from './auth/AuthProvider';
import AuthEntityLoader from './auth/AuthEntityLoader';


export default function handler(lambda, options = undefined){
    return async function(event, context){
        let response = { success: true }, status;

        try{
            const request = new APIRequest(event, context);
            
            /**
             * Options Object Processing
             * Currently expects optionally
             * 
             * options = {
             *      auth: true,
             *      authAdmin: <firebase admin object passed from the service>
             *      authEntity: <Entity that needs to be authenticated>,
             *      loadAuthEntity: true
             * }
             * 
             */

            if(options){
                if(options.auth){
                    await new AuthProvider(options.authAdmin, options.authEntity).authenticate(request);
                    if(options.loadAuthEntity){
                        await new AuthEntityLoader(options.authEntity).loadEntity(request);
                    }
                }
            }

            const result = await lambda(request);
            status = result.status;
            response.responseObject = result.data;


        } catch(error){
            response.success = false;
            response.responseObject = error.getResponse();
            status = error.getStatus();
        }

        return new APIResponse(status, response);
    }
}