import mysql from 'mysql';

const connection = mysql.createConnection({
    host: process.env.HOST_NAME || "localhost",
    user: "root",
    password: "",
    database: "twitter",
});

export function Connection() {
    return connection;
}