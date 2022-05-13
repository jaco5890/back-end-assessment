function response(res, status, message, data){
    res.status(status);
    res.json({
        status,
        message,
        data
    });
}

module.exports = {
    Success(res, data){
        response(res, 200, 'Success', data);
    },
    CreateSuccess(res, data){
        response(res, 201, 'Successfully created', data)
    },
    BadRequest(res,data){
        response(res, 400, 'Bad request', data)
    },
    Forbidden(res,data){
        response(res, 403, 'Unauthorized', data)
    },
    NotFound(res,data){
        response(res, 404, 'Not found', data)
    },
    InternalError(res,data){
        response(res, 500, 'Internal server error', data) 
    }
}