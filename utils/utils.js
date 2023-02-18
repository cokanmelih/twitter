"use strict";
exports.__esModule = true;
var bcrypt = require('bcrypt');
function encryptPassword(pass) {
    var newPassword = pass.toString();
    var hashedPassword = bcrypt.hash(newPassword, 10);
    return hashedPassword;
}
function checkPassword(guess, cryptedPass) {
    var a = bcrypt.compare(guess, cryptedPass);
    return a;
}
function isNullOrEmpty() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var arg = args_1[_a];
        if (arg === "" || arg === null || arg === undefined) {
            return true;
        }
    }
    return false;
}
exports["default"] = { encryptPassword: encryptPassword, checkPassword: checkPassword, isNullOrEmpty: isNullOrEmpty };
