const moment = require('moment');
const UserRepo = require('../repositories/users');
const { ResponseObj } = require('../utils/responsewrapper');

async function GetByID(Member_ID) {
    let objRes = new ResponseObj;
    let result = await UserRepo.GetByID(Member_ID);
    if (result) {
        objRes.Message = 'Get By Id';
        objRes.Data = result;
        return objRes;
    }
    objRes.Is_Success = false;
    objRes.Message = 'No Data';
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
    objRes.Message = 'No Data';
    return objRes;
}

async function Add(Member) {
    let objRes = new ResponseObj;
    let currentTime = moment().format("YYYY-MM-DDTHH:mm:ss");
    Member.Created_Date = currentTime;
    Member.Created_By = 1;
    let result = await UserRepo.Add(Member);
    if (result) {
        objRes.Message = 'Created';
        objRes.Data = result;
        return objRes;
    }
    objRes.Is_Success = false;
    objRes.Message = 'Error on Creation';
    return objRes;
}

async function Update(Member) {
    let objRes = new ResponseObj;
    let currentTime = moment().format("YYYY-MM-DDTHH:mm:ss");
    let result = await UserRepo.GetByID(Member.Member_ID);
    if (!result) {
        objRes.Is_Success = false;
        objRes.Message = 'Error on Updation';
        return objRes;
    }
    Member.Update_Date = currentTime;
    let updateResult = await UserRepo.Update(result, Member);
    if (!updateResult) {
        objRes.Is_Success = false;
        objRes.Message = 'Error on Updation';
        return objRes;
    }
    objRes.Message = 'Update';
    objRes.Data = result;
    return objRes;
}

async function Delete(Member_ID) {
    let objRes = new ResponseObj;
    let result = await UserRepo.GetByID(Member_ID);
    if (result) {
        let deleteResult = UserRepo.Delete(result);
        if (deleteResult) {
            objRes.Message = 'Deleted';
            return objRes;
        }
    }
    objRes.Is_Success = false;
    objRes.Message = 'No Data';
    return objRes;
}

module.exports = {
    GetByID,
    Get,
    Add,
    Update,
    Delete,
};