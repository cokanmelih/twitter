import bcrypt from 'bcrypt';

function encryptPassword(pass: string) {
    const hashedPassword = bcrypt.hash(pass, 10)

    return hashedPassword;
}
function checkPassword(guess: any, cryptedPass: any) {
    return new Promise(async (resolve,reject)=>{
        if(!await bcrypt.compare(guess, cryptedPass)){
            reject("Passwords does not match");
            return;
        }
            resolve("Success");
            return;
    })
   
}

function isNullOrEmpty(...args: any) {
    for (let arg of args) {
        if (arg === "" || arg === null || arg === undefined ) {
            return true;
        }
    }
    return false;
}

function createExpireDate(){
    return new Date(Date.now() + 30 * 24 * 60 * 60).toISOString().slice(0, 19).replace('T', ' ')
}

class Response {
    data: any;
    description: string;

    constructor(data: any, description: string) {
        this.data = data;
        this.description = description;
    }
}

export default { encryptPassword, checkPassword, isNullOrEmpty, Response,createExpireDate }