const moment = require('moment');
const AuthRepo = require('../repositories/auth');
const { ResponseObj } = require('../utils/responsewrapper');
const { Encrypt, Compare } = require('../utils/EncryptDecrypt');
const { GenerateAccessToken, GenerateRefreshToken, VerifyRefreshToken } = require('../utils/tokenhandler');
const Token = require('../repositories/refreshtoken');

/**
 * Signup
 * @param {Object} User
 * @returns {Promise}
 */
async function Signup(User) {
    let objRes = new ResponseObj;
    let currentDate = moment().format("YYYYMMDDHHmmss");
    let result = await AuthRepo.GetByEmail(User.Email);
    if (result) {
        objRes.Message = 'Email address already exists in our system.';
        objRes.IsSuccess = false;
        return objRes;
    }
    const encryptedPassword = await Encrypt(User.Password);
    User.Password = encryptedPassword;
    User.CurrentDate = currentDate;
    let createResult = await AuthRepo.Create(User);
    if (!createResult) {
        objRes.Message = 'Error on Creation';
        objRes.IsSuccess = false;
        return objRes;
    }
    objRes.Message = 'Your have registered in our system. Now you can login with your email.';
    return objRes;
}

/**
 * Login
 * @param {string} Email
 * @param {string} Password
 * @returns {Promise}
 */
async function Login(Body) {
    const {
        Email,
        Password,
    } = Body;
    let objRes = new ResponseObj;
    let currentDate = moment().format('YYYYMMDDHHmmss');
    let result = await AuthRepo.GetByEmail(Email);
    if (!result) {
        objRes.IsSuccess = false;
        objRes.Message = 'Authentication failed. User not found.';
        return objRes;
    }

    const boolean = await Compare(Password, result.dataValues.Password);
    if (!boolean) {
        objRes.IsSuccess = false;
        objRes.Message = 'Authentication failed. User not found.';
        return objRes;
    }
    if (result.IsLoggedIn) {
        objRes.IsSuccess = false;
        objRes.AlreadyLogin = true;
        objRes.Message = 'Already Logged in';
        return objRes;
    }
    const token = GenerateAccessToken({ ID: result.ID });
    const refreshToken = GenerateRefreshToken({ ID: result.ID });
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    await Token.Create(refreshToken, result.ID, expiryDate, new Date());
    let UserObj = result.dataValues;
    UserObj.LastLoggedIn = currentDate;
    UserObj.IsLoggedIn = 1;
    UserObj.Token = token;
    let updateResult = await AuthRepo.Update(result, UserObj);
    if (!updateResult) {
        objRes.Message = 'Error on Updation';
        objRes.IsSuccess = false;
        return objRes;
    }
    objRes.Message = 'Updated!';
    objRes.Data = { ID: UserObj.ID, Token: token, RefreshToken: refreshToken }
    return objRes;
}

/**
 * Forget password email sending
 * @param {string} Email
 * @returns {Promise}
 */
async function ForgetPassword(Email) {
    let objRes = new ResponseObj;
    let result = await AuthRepo.GetByEmail(Email);
    if (!result) {
        objRes.IsSuccess = false;
        objRes.Message = 'User not found.';
        return objRes;
    }
    objRes.Message = 'We have sent you a reset link to update your password. Kindly check your Email.';
    return objRes;
};

/**
 * Reset password
 * @param {string} Email
 * @param {string} OldPassword
 * @param {string} NewPassword
 * @returns {Promise}
 */
async function ResetPassword(Email, OldPassword, NewPassword) {
    let objRes = new ResponseObj;
    let result = await AuthRepo.GetByEmail(Email);
    if (!result) {
        objRes.IsSuccess = false;
        objRes.Message = 'User not found.';
        return objRes;
    }
    const boolean = await Compare(OldPassword, result.dataValues.Password);
    if (!boolean) {
        objRes.IsSuccess = false;
        objRes.Message = 'User not found.';
        return objRes;
    }
    const encryptedPassword = await Encrypt(NewPassword);
    let User = result.dataValues;
    User.Password = encryptedPassword;
    let updateResult = await AuthRepo.Update(result, User);
    if (!updateResult) {
        objRes.Message = 'Error on Password Update';
        objRes.IsSuccess = false;
        return objRes;
    }
    objRes.Message = 'Password Updated!';
    return objRes;
};

/**
 * Logout
 * @param {number} ID
 * @returns {Promise}
 */
async function Logout(ID) {
    let objRes = new ResponseObj;
    let result = await AuthRepo.GetByID(ID);
    if (!result) {
        objRes.IsSuccess = false;
        objRes.Message = 'User not found.';
        return objRes;
    }
    let logoutResult = await AuthRepo.Logout(result);
    await Token.Delete(result.Token);
    if (!logoutResult) {
        objRes.IsSuccess = false;
        objRes.Message = 'Error On Logout';
        return objRes;
    }
    objRes.Message = 'Logged out!';
    return objRes;
}

/**
 * RefreshToken
 * @param {number} ID
 * @returns {Promise}
 */
async function RefreshToken(ID) {
    let objRes = new ResponseObj;
    if (!req.body.Token) return res.status(401).json({ message: 'No token provided' });

    const storedToken = await Token.GetByToken(req.body.Token);
    if (!storedToken) return res.status(403).json({ message: 'Invalid refresh token' });

    if (new Date(storedToken.ExpiryDate) < new Date()) {
        await Token.Delete(req.body.Token);
        return res.status(403).json({ message: 'Refresh token expired' });
    }

    const isVerfied = VerifyRefreshToken(req.body.Token);
    if (!isVerfied) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = GenerateAccessToken({ ID: ID });

    let result = await AuthRepo.GetByID(ID);
    if (!result) {
        objRes.IsSuccess = false;
        objRes.Message = 'User not found.';
        return objRes;
    }
    UserObj.Token = newAccessToken;
    let updateResult = await AuthRepo.Update(result, UserObj);
    if (!updateResult) {
        objRes.Message = 'Error on Updation';
        objRes.IsSuccess = false;
        return objRes;
    }

    objRes.Token = newAccessToken;
    objRes.Message = 'Token refereshed!';
    return objRes;
}

module.exports = {
    Signup,
    Login,
    Logout,
    ForgetPassword,
    ResetPassword,
    RefreshToken
};