class User {
    constructor(username, password, mail, phone, phone_approved, mail_approved) {
        this.username = username;
        this.password = password;
        this.mail = mail;
        this.phone = phone;
        this.mail_approved = mail_approved;
        this.phone_approved = phone_approved;
    }
}
export default { User };
