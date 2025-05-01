let ResponseObj = function () {
    return {
        HttpStatus: 200,
        IsSuccess: true,
        AlreadyLogin: false,
        Message: '',
        Data: [],
        Stack: ''
    }
}
function SendApiResponse(Res, Obj) {
    Res.send(Obj);
};

module.exports = {
    ResponseObj,
    SendApiResponse
}