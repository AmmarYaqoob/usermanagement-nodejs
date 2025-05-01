const moment = require('moment');
const UserRepo = require('../repositories/users');
const { ResponseObj } = require('../utils/responsewrapper');
const StatusMessage = require('../enums/statusmessage');
const { Encrypt } = require('../utils/EncryptDecrypt');
const { Signup } = require('../services/auth');

async function GetByID(ID) {
    let objRes = new ResponseObj;
    let result = await UserRepo.GetByID(ID);
    if (result) {
        objRes.Message = 'Get By Id';
        objRes.Data = result;
        return objRes;
    }
    objRes.Is_Success = false;
    objRes.Message = StatusMessage.NODATA;
    return objRes;
}

async function Get() {
    let objRes = new ResponseObj;
    let result = await UserRepo.Get();
    if (result) {
        objRes.Message = 'Get All';
        objRes.Data = result;
        return objRes;
    }
    objRes.Is_Success = false;
    objRes.Message = StatusMessage.NODATA;
    return objRes;
}

async function Add(User) {
    let objRes = await Signup(User)
    return objRes;
}

async function Update(User) {
    let objRes = new ResponseObj;
    let currentTime = moment().format("YYYY-MM-DDTHH:mm:ss");
    let result = await UserRepo.GetByID(User.ID);
    if (!result) {
        objRes.Is_Success = false;
        objRes.Message = StatusMessage.UPDATEERROR;
        return objRes;
    }
    result.UserName = User.UserName;
    result.Email = User.Email;
    result.UpdateDate = currentTime;
    let updateResult = await UserRepo.Update(result);
    if (!updateResult) {
        objRes.Is_Success = false;
        objRes.Message = StatusMessage.UPDATEERROR;
        return objRes;
    }
    objRes.Message = 'Update';
    objRes.Data = result;
    return objRes;
}

async function Delete(ID) {
    let objRes = new ResponseObj;
    let result = await UserRepo.GetByID(ID);
    if (result) {
        let deleteResult = UserRepo.Delete(result);
        if (deleteResult) {
            objRes.Message = StatusMessage.DELETED;
            return objRes;
        }
    }
    objRes.Is_Success = false;
    objRes.Message = StatusMessage.NODATA;
    return objRes;
}

module.exports = {
    GetByID,
    Get,
    Add,
    Update,
    Delete,
};