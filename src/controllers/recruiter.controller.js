import { recrutiers, Recrutier } from "../models/recruiter.model.js";

export default class RecrutierController{
    //-------getting login form----------
    getLogin(req,res){
        return res.render('recruiterLogin');
        //return res.render('recruiterLogin', {errorMessage : null})
    }

    //-----submitting login dara------
    postLogin(req,res){
        
        //console.log("from postLogin")
        const { email, password } = req.body;

        //console.log('email', email);
        //console.log('password', password);
        req.session.email = email;

        //find recruiter with matching email and password
        const foundRecruiter = Recrutier.checkRecruiter(email,password);
        //console.log('foundRecruiter:', foundRecruiter);

        if(foundRecruiter){
            //req.session.email = email;
            req.session.email = foundRecruiter.email;
            req.session.name = foundRecruiter.name;
            return res.redirect('/');
        }
        else{
            
            return res.render('recruiterLogin', { errorMessage: 'Invalid email or password. Please try again.' });
        }
    }

    //----------registration------------
    postRegister(req, res){

        //console.log(req.body);
        const {name, email, password} = req.body;
        const id = recrutiers.length+1;
        Recrutier.addRecrutier(id,name, email, password);
        
        //console.log('from postRegister',recrutiers);
        
        res.render('recruiterLogin');
    }
    
    //----------logout------------
    logout(req,res){
        //destroy session
        req.session.destroy(function(err){
            //cannot access session
            if (err) {
                //console.log(err);
            }
            else{
                //destroyed session
                return res.redirect("/login");
            }
        })
    }
    
}