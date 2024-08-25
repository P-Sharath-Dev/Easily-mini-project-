const lastVisit = (req, res, next)=>{
    //check if cookie is set already
    if (req.cookies.lastVisit) {
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleDateString();
    }
    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
    });
    next();
 }

 export default lastVisit;