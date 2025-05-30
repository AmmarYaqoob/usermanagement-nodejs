const Service = require('../services/auth');
const { CatchAsync } = require('../utils/catchasync');
const { SendApiResponse } = require('../utils/responsewrapper');

async function Signup(req, res) {
    let user = req.body;
    let result = await Service.Signup(user);
    return SendApiResponse(res, result);
}

const Login = async (req, res, next) => {
    const result = await Service.Login(req.body);
    return SendApiResponse(res, result);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
};

async function Logout(req, res) {
    let result = await Service.Logout(req.query.ID);
    return SendApiResponse(res, result);
}

async function ForgetPassword(req, res) {
    let result = await Service.ForgetPassword(req.query.Email);
    return SendApiResponse(res, result);
}

async function ResetPassword(req, res) {
    const {Email, OldPassword, NewPassword} = req.body;
    let result = await Service.ResetPassword(Email, OldPassword, NewPassword);
    return SendApiResponse(res, result);
}

async function RefreshToken(req, res) {
    const {ID, Token} = req.body;
    return await Service.RefreshToken(res, ID, Token);
    // return SendApiResponse(res, result);
};

module.exports = {
    Signup,
    Login,
    Logout,
    ForgetPassword,
    ResetPassword,
    RefreshToken
};