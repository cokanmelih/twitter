const bcrypt = require('bcrypt');

function encryptPassword(pass:String) {
    const newPassword = pass.toString();
    const hashedPassword = bcrypt.hash(newPassword, 10)

    return hashedPassword;
}
function checkPassword(guess:String, cryptedPass:String) {
   const a =  bcrypt.compare(guess, cryptedPass)
   return a;
}

function isNullOrEmpty(...args:any) {
    for (let arg of args) {
        if (arg === "" || arg === null || arg === undefined) {
            return true;
        }
    }
    return false;
}

export default { encryptPassword, checkPassword, isNullOrEmpty }