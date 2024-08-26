import express from 'express';
import path from 'path';
import UserController from './src/controllers/user.controller.js';
import RecrutierController from './src/controllers/recruiter.controller.js';
import JobsController from './src/controllers/jobs.controller.js';
import ejs from "ejs";
import expressLayouts from 'express-ejs-layouts';
import multer from 'multer';
import { fileUpload } from './src/middleware/fileUpload.middleware.js';
import session from 'express-session';
import  recruiterAuth from './src/middleware/recruiterAuth.middleware.js'
import cookieParser from 'cookie-parser';
import lastVisit from './src/middleware/lastVisit.middleware.js';
// import validateApplication from './src/middleware/validateApplication.middleware.js';

const app = express()
const port = 3000

//configuring ejs as view engine
app.set('view engine', 'ejs')

//defining views directory
app.set('views',path.join(path.resolve('src', 'views')))

//using express-ejs-layouts
app.use(expressLayouts);

// Middleware to parse form data
app.use(express.urlencoded({extended : true}));

//middleware for serving static files(html)
app.use(express.static('src/views'))

//public
//app.use(express.static(path.join(path.resolve("public"))));
app.use(express.static('public'));

//session
app.use(session({
  secret : 'keyword cat',
  resave : false,
  saveUninitialized : true,
  cookie : {secure : false},
}));

//getting email and name from session
app.use((req, res, next) => {
  res.locals.email = req.session.email || null;
    res.locals.name = req.session.name || null;
  next();
});

//using cookie middleware
app.use(cookieParser());
app.use(lastVisit);

//controller instances
const userController = new UserController();
const recrutierController = new RecrutierController();
const jobsController = new JobsController();

//homePage
app.get('/', userController.getHomePage);

//jobSeeker page
app.get('/jobs', jobsController.getJobs);

// Route for displaying a job page based on its ID
app.get('/job/:id', jobsController.getJobDetails);

// Route for applying to a job based on its ID
//app.post('/apply/:id', fileUpload.single('resume'),validateApplication, jobsController.applyForJob);
app.post('/apply/:id', fileUpload.single('resume'), jobsController.applyForJob);

//get login
app.get('/login',recrutierController.getLogin);
//post register 
app.post('/register',recrutierController.postRegister);
//post login form
app.post('/login',recrutierController.postLogin)

//logout
app.get('/logout',recrutierController.logout);
//get post job form
app.get('/postJob', recruiterAuth, jobsController.getPostJob);
//post job form
app.post("/postJob",recruiterAuth,jobsController.postJob);

//get update job form
app.get('/updateJob/:id', jobsController.getUpdateJobForm);

//post update job form
app.post('/updateJob', jobsController.postUpdateJobForm);

//delete job
app.delete('/job/:id',jobsController.deleteTheJob);

app.listen(port, () => {
  console.log(`job portal app listening on port ${port}`)
})