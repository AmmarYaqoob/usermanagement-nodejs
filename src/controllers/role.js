const Role = require('../services/role');
const { SendApiResponse } = require('../utils/responsewrapper');

async function GetByID(req, res) {
    let result = await Role.GetByID(req.params.ID);
    return SendApiResponse(res, result)
}

async function Get(req, res) {
    let result = await Role.Get();
    return SendApiResponse(res, result)
}

async function Add(req, res) {
    let result = await Role.Add(req.body);
    return SendApiResponse(res, result)
}

async function Update(req, res) {
    let result = await Role.Update(req.body);
    return SendApiResponse(res, result)
}

async function Delete(req, res) {
    let result = await Role.Delete(req.params.ID);
    return SendApiResponse(res, result)
}

module.exports = {
    GetByID,
    Get,
    Add,
    Update,
    Delete,
};