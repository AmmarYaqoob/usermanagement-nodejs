let RefreshToken = require('../models/tokens');

async function GetByToken(Token) {
    let content = await RefreshToken.findOne({
        where: {
            Token: Token
        }
    });
    return content;
}

async function Create(Token, ID, ExpiryDate, CreatedDate) {
    let content = await RefreshToken.create({
        UserID: ID,
        Token: Token,
        ExpiryDate: ExpiryDate,
        CreatedDate: CreatedDate
    });
    return content;
}

async function Delete(Token) {
    let content = await RefreshToken.destroy({
        where: {
            Token: Token
        }
    });
    return content;
}

module.exports = {
    GetByToken,
    Create,
    Delete
};