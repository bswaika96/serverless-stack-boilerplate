import APIResponse from './api/APIResponse';
import APIRequest from './api/APIRequest';
import AuthProvider from './auth/AuthProvider';
import AuthEntityLoader from './auth/AuthEntityLoader';
import AppError from './errors/AppErrors';


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
             *      loadAuthEntity: true,
             *      authEntityTableName: <required when loadAuthEntity is true; table name string passed from the service>
             *      databaseClient: <required when loadAuthEntity is true;  datatbase client object passed from the service>
             * }
             * 
             */

            if(options){
                if(options.auth){
                    await new AuthProvider(options.authAdmin, options.authEntity).authenticate(request);
                    if(options.loadAuthEntity){
                        await new AuthEntityLoader(options.databaseClient, options.authEntityTableName, options.authEntity).loadEntity(request);
                    }
                }
            }

            const result = await lambda(request);
            status = result.status;
            response.responseObject = result.data;


        } catch(error){
            response.success = false;
            if(error instanceof AppError){
                response.responseObject = error.getResponse();
                status = error.getStatus();
            }else{
                response.responseObject = {
                    message: 'Internal Server Error',
                    code: 500,
                    info: error.message
                }
                status = 500;
            }
        }

        return new APIResponse(status, response);
    }
}