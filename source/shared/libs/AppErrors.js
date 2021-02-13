export default class AppError extends Error{
    constructor(status, message){
        super(message);
        this.status = status;
        this.name = message.split(' ').join('');
    }

    getStatus(){
        return this.status;
    }

    getResponse(){
        return {
            code: this.status,
            message: this.message
        }
    }
}

export class ValidationError extends AppError{
    constructor(issues){
        super(406, 'Validation Error');
        this.issues = issues;
    }

    getResponse(){
        return {
            code: this.status,
            message: this.message,
            issues: this.issues
        }
    }
}

export class AuthenticationError extends AppError{
    constructor(entity){
        super(401, 'Authentication Error');
        this.entity = entity;
    }

    getResponse(){
        return {
            code: this.status,
            message: this.message,
            entity: this.entity
        }
    }
}

export class BadRequestError extends AppError{
    constructor(issue){
        super(400, 'Bad Request Error');
        this.issue = issue;
    }

    getResponse(){
        return {
            code: this.status,
            message: this.message,
            issue: this.issue
        }
    }
}