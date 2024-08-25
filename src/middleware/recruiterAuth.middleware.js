export default function recruiterAuth(req, res, next){
    console.log("Session email in auth middleware:", req.session.email);

    // Check if the user is authenticated
    if(req.session.email){
        //req.locals = req.session;
        return next();
    }
    return res.render("oopsPage");
}