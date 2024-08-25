
import JobModel, { jobs } from '../models/job.model.js';
import { Applications,applications } from '../models/user.model.js';
import path from "path";


export default class JobsController{
    //-------getting all jobs---------------
    getJobs(req, res){
        console.log("JobModel.getJobs:", JobModel.getJobs());

        const jobsList = JobModel.getJobs();   
        //console.log("jobsList:", jobsList); 
        return res.render("jobs", {jobs : jobsList});
    }

    //-----------showing job details------------
    getJobDetails(req, res){
        const jobId = parseInt(req.params.id);
        const job = jobs.find(job => job.id === jobId);

        if (job) {
            
            req.job = job;
            // Render applyJob.ejs with job details
            return res.render("applyJob", { job, applications });
        } else {
            // If job not found, render an error page or redirect
            return res.status(404).render("oopsPage", { message: "Job not found" });
        }
    }

    //accessing applications array
    applyForJob(req, res){

        console.log("req.body from applyforjob", req.body)
        const jobId = parseInt(req.params.id);
       
        const {name, email, contact} = req.body;
        //console.log("req.file--------->",req.file);
        // const job = jobs.find(job => job.id === jobId);

        // Extract application data from form submission
        const application = {
            jobId: jobId,
            name,
            email,
            contact,
            resume: req.file.filename,
        };
        
         // Add the new application to the applications array
        applications.push(application);

        console.log("applications array : ", applications);

        // Redirect to /jobs after successfully applying
        return res.redirect('/jobs');
         
    }

    //--------getting post new job form---------------
    getPostJob(req, res){
        return res.render("PostJob",{email : req.session.email});
    }

    //------------submitting post new job form--------------
    postJob(req, res){
        // console.log("Session email:", req.session.email);
        // console.log("from post job",req.body);

        //updating jobs array
        JobModel.addNewJob(req.body);
        const jobs = JobModel.getJobs();
    return res.redirect('/jobs');
   }

   //-----------get update job form-------------
   getUpdateJobForm(req,res){
    console.log("from getUpdateJobForm method : ", req.params);
    //if job exists show updateJob form
    const id = req.params.id;
    const job = JobModel.findById(id);
    if(job){
        job.applyBy = new Date(job.applyBy).toISOString().split('T')[0];
        console.log("job from getUpdateJobForm : ", job)
        return res.render("updateJob",{job});
    }
    else{
        console.log("else part of getUpdateJob : something is not missing" )
        return res.status(404).render("oopsPage");
    }
    
   }

   // -------updating job----------
   postUpdateJobForm(req,res){
    const updatedJob = req.body;
    if (!Array.isArray(updatedJob.skills)) {
        updatedJob.skills = [updatedJob.skills];
    }
    //update job
    JobModel.update(updatedJob);
    console.log("from postUpdate form", updatedJob);
    //const job = JobModel.getJobs();
    return res.redirect('/jobs');
   }
   
   //==========deleting job--------
deleteTheJob(req, res) {
    console.log('I am in delete job controller');
    
    const id = req.params.id;
    const job = JobModel.findById(id);

    if (!job) {
        return res.status(404).render('oopsPage');
    } else {
        // Delete the job if it exists
        JobModel.deleteJob(id);
        const jobs = JobModel.getJobs();
        
        // Assuming applications array needs to be updated after deleting the job
        const updatedApplications = applications.filter(app => app.jobId !== parseInt(id));
        
        // Render applyJob.ejs with updated jobs and applications list
        return res.render('jobs', { job: null, applications: updatedApplications });
        }
    }
}

