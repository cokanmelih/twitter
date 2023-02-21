var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
function encryptPassword(pass) {
    const hashedPassword = bcrypt.hash(pass, 10);
    return hashedPassword;
}
function checkPassword(guess, cryptedPass) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        if (!(yield bcrypt.compare(guess, cryptedPass))) {
            reject("Passwords does not match");
            return;
        }
        resolve("Success");
        return;
    }));
}
function isNullOrEmpty(...args) {
    for (let arg of args) {
        if (arg === "" || arg === null || arg === undefined) {
            return true;
        }
    }
    return false;
}
function createExpireDate() {
    return new Date(Date.now() + 30 * 24 * 60 * 60).toISOString().slice(0, 19).replace('T', ' ');
}
class Response {
    constructor(data, description) {
        this.data = data;
        this.description = description;
    }
}
export default { encryptPassword, checkPassword, isNullOrEmpty, Response, createExpireDate };
