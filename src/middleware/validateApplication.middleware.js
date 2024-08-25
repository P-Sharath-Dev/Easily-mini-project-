import { body, validationResult } from "express-validator";
const validateApplication = async (req, res, next)=>{

    //1. set up rules
    const rules = [
        body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
        body('email').isEmail().withMessage('Email is invalid'),
        body('contact').isMobilePhone().withMessage('Contact number is invalid'),
        body('resume').custom((value, {req})=>{
            if(!req.file){
                throw new Error('invalid file');
            }
            return true;
        })
        
    ]
    //2. run rules
    await Promise.all(rules.map(rule => rule.run(req)));

    //3.check for error
    const validationErrors = validationResult(req);
    //console.log(validationErrors);

    if(!validationErrors.isEmpty()){
        return res.render('applyJob', {errmsg : validationErrors.array()[0]});
    }

    next();
}

export default validateApplication;