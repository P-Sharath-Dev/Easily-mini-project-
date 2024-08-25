
class Recrutier{
    constructor(_id,_name, _email,_password){
        this.id = _id;
        this.name = _name;
        this.email = _email;
        this.password = _password;
    }
    static addRecrutier(id,name, email, password){
        const newRecrutier = new Recrutier(
            id,
            name,
            email,
            password,
        );
        recrutiers.push(newRecrutier);
        
    }
    static checkRecruiter(email,password){
        const foundRecruiter = recrutiers.find(recrutier => {

            return (recrutier.email === email && recrutier.password === password);
        });
        return foundRecruiter;
    }
}

const recrutiers = [
    new Recrutier(
        1,
        'john',
        'john@gmail.com',
        '123',
    ),
];
export {recrutiers, Recrutier};