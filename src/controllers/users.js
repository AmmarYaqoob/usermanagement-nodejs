const Service = require('../services/users');
const { CatchAsync } = require('../utils/catchasync');
const { SendApiResponse } = require('../utils/responsewrapper');

const GetByID = CatchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
});

async function Get(req, res) {
    let result = await Service.Get();
    return SendApiResponse(res, result)
}

async function Add(req, res) {
    let user = req.body;
    let result = await Service.Add(user);
    return SendApiResponse(res, result)
}

async function Update(req, res) {
    let user = req.body;
    let result = await Service.Update(user);
    return SendApiResponse(res, result)
}

async function Delete(req, res) {
    let user_ID = req.query.User_ID;
    let result = await Service.Delete(user_ID);
    return SendApiResponse(res, result)
}

module.exports = {
    GetByID,
    Get,
    Add,
    Update,
    Delete,
};