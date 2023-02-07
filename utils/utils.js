import bcrypt from 'bcrypt';

function encryptPassword(pass) {
    const newPassword = pass.toString();
    const hashedPassword = bcrypt.hash(newPassword, 10)

    return hashedPassword;
}
function checkPassword(guess, cryptedPass) {
   const a =  bcrypt.compare(guess, cryptedPass)
   return a;
}

function isNullOrEmpty(...args) {
    for (let arg of args) {
        if (arg === "" || arg === null || arg === undefined) {
            return true;
        }
    }
    return false;
}

export default { encryptPassword, checkPassword, isNullOrEmpty }