import path from "path";
import { applications, Applications } from "../models/user.model.js";
import JobModel, { jobs } from "../models/job.model.js";


export default class UserController{
    // Home Page
    getHomePage(req, res) {
        return res.render('homePage',{email : req.session.email});
    }
}