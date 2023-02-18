"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mysql = require("mysql");
var utils_1 = require("../../utils/utils");
var uuid_1 = require("uuid");
function LogIn(req, res) {
    var conn = mysql.createConnection({
        host: process.env.HOST_NAME || "localhost",
        user: "root",
        password: "",
        database: "twitter"
    });
    var username = req.query.username;
    var password = req.query.password;
    var query = conn.query('SELECT * FROM accounts WHERE username = ?', [username]);
    if (!utils_1["default"].isNullOrEmpty(username, password)) {
        query.on('result', function (row) {
            var isValidPassword = utils_1["default"].checkPassword(password, row.password);
            isValidPassword.then(function (value) {
                if (value) {
                    var user_1 = row;
                    delete user_1.password;
                    new Date().toISOString().slice(0, 19).replace('T', ' ');
                    var unixTimeStamp = Date.now();
                    var expireDate = (new Date(unixTimeStamp + 30 * 24 * 60 * 60)).toISOString().slice(0, 19).replace('T', ' ');
                    var session_1 = {
                        account_id: user_1.id,
                        expires_at: expireDate,
                        token: (0, uuid_1.v4)()
                    };
                    conn.query("INSERT INTO sessions SET ?", session_1, function (err, resp) {
                        if (err) {
                            res.statusCode = 400;
                            res.send();
                            console.log(err);
                        }
                        else {
                            res.statusCode = 200;
                            res.send({
                                session: session_1.token,
                                user: user_1
                            });
                        }
                    });
                }
                else {
                    res.statusCode = 400;
                    res.send("Invalid username or password");
                }
            });
        });
    }
    else {
        res.statusCode = 400;
        res.send("Necessary parameters not given");
    }
}
function Register(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, username, mail, phone, password, account_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = mysql.createConnection({
                        host: process.env.HOST_NAME || "localhost",
                        user: "root",
                        password: "",
                        database: "twitter"
                    });
                    username = req.query.username;
                    mail = req.query.mail;
                    phone = req.query.phone;
                    password = req.query.password;
                    if (!!utils_1["default"].isNullOrEmpty(username, password, mail, phone)) return [3 /*break*/, 3];
                    return [4 /*yield*/, utils_1["default"].encryptPassword(password)];
                case 1:
                    password = _a.sent();
                    account_1 = {
                        "username": username,
                        "password": password,
                        "mail": mail,
                        "phone": phone,
                        "mail_approved": 0,
                        "phone_approved": 0
                    };
                    return [4 /*yield*/, conn.query("SELECT * FROM accounts WHERE username = ?", username, function (err, resp) {
                            if (err)
                                res.statusCode = 400;
                            res.send;
                            if (resp.length) {
                                res.statusCode = 400;
                                res.send("User already exist");
                            }
                            else {
                                conn.query("SELECT * from accounts WHERE mail = ?", mail, function (err, resp) {
                                    if (err)
                                        res.statusCode = 400;
                                    res.send;
                                    if (resp.length) {
                                        res.statusCode = 400;
                                        res.send("Mail already exist");
                                    }
                                    else {
                                        conn.query("INSERT INTO accounts SET ?", account_1, function (err, respo) {
                                            if (err) {
                                                res.statusCode = 400;
                                                res.send();
                                            }
                                            else {
                                                res.statusCode = 200;
                                                res.send("Successfully registered");
                                            }
                                        });
                                    }
                                });
                            }
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    res.statusCode = 400;
                    res.send('Necessary Parameters Not Given');
                    _a.label = 4;
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = { LogIn: LogIn, Register: Register };
