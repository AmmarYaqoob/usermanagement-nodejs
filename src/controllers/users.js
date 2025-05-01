const Service = require('../services/users');
const { CatchAsync } = require('../utils/catchasync');
const { SendApiResponse } = require('../utils/responsewrapper');
const HttpStatus = require('../enums/httpstatus');

const GetByID = CatchAsync(async (req, res) => {
    const result = await Service.GetByID(req.params.ID);
    // const tokens = await tokenService.generateAuthTokens(user);
    res.status(HttpStatus.OK).send(result);
});

const Get = CatchAsync(async (req, res) => {
    let result = await Service.Get();
    return SendApiResponse(res, result)
});

const Add = CatchAsync(async (req, res) => {
    let user = req.body;
    let result = await Service.Add(user);
    res.status(HttpStatus.OK).send(result);
});

const Update = CatchAsync(async (req, res) => {
    let user = req.body;
    let result = await Service.Update(user);
    return SendApiResponse(res, result)
});

const Delete = CatchAsync(async (req, res) => {
    let result = await Service.Delete(req.params.ID);
    return SendApiResponse(res, result)
});

module.exports = {
    GetByID,
    Get,
    Add,
    Update,
    Delete,
};