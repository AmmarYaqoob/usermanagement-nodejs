var bcrypt = require('bcrypt');
function Encrypt(password) {
    return bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash);
}
function Compare(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
    Encrypt,
    Compare
}