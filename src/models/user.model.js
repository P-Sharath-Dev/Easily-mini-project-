const applications = [];

class Applications{
    constructor(id, name, email, contact, resume) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resume = resume;
    }
}
export {applications, Applications};