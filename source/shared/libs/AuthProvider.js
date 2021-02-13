import {AuthenticationError, BadRequestError} from './AppErrors';

export default class AuthProvider{
    constructor(authAdmin, entity){
        this._authAdmin = authAdmin;
        this.entity = entity;
    }

    async authenticate(request){
        if(!request.hasAuthHeader()) throw new BadRequestError('Expected `Authorization` Header with Firebase Token');
        try{
            const decodedToken = await this._authAdmin.auth().verifyIdToken(request.headers.Authorization);
            request.addProp('firebaseId', decodedToken.uid);
            return;
        }catch(error){
            throw new AuthenticationError(this.entity);
        }
    }
}