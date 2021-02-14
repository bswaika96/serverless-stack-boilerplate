import AppError from '../../../shared/libs/errors/AppErrors';
import handler from '../../../shared/libs/GlobalHandler';

const users = [{
    name: 'Baladitya',
    age: 25
},{
    name: 'I had to make a change to test CI/CD again',
    age: 29
}];

const lambda = async(request) => {
    if(request.headers.Throw == 'Error'){
        throw new AppError(500, 'Internal Server Error');
    }
    return {
        status: 200,
        data: users
    };
};

export const main = handler(lambda);