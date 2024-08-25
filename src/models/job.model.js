export default class JobModel{
    constructor(_id, _companyName, _jobType, _role, _location, _package, _skills, _applyBy, _openings){
        this.id = _id;
        this.companyName = _companyName;
        this.jobType =_jobType;
        this.role = _role;
        this.location = _location;
        this.package = _package;
        this.skills = _skills;
        this.applyBy = _applyBy;
        this.openings = _openings;
    }

    //--getting all jobs-----
    static getJobs(){
        
        return jobs;
    }

    //-----adding new job--------
    static addNewJob(job){

        // Extracting properties from the job object
        const {
            company_name,
            job_category,
            job_designation,
            job_location,
            salary,
            skills_required,
            apply_by,
            number_of_openings,
        } = job;

        // Convert skills to an array if provided as a string.
        const skillsArray = Array.isArray(skills_required) ? skills_required : skills_required.split(',').map(skill => skill.trim());
        
        // Creating a new job with the extracted properties
        const newJob = new JobModel(
            jobs.length + 1,
            company_name,
            job_category,
            job_designation,
            job_location,
            salary,
            skillsArray,
            apply_by,
            number_of_openings
        );
        jobs.push(newJob);
    }

    //------finding job by id---------
    static findById(id){
        const foundJob =  jobs.find(job => job.id == id);
        //console.log('found job :', foundJob);
        return foundJob;
    }

    //-----updating the job-------------
    static update(updatedJob){
        const index = jobs.findIndex(j => j.id == updatedJob.id);
        jobs[index] = updatedJob;
    }

    //-----deleting the job----------
    static deleteJob(id){

        //console.log("id from deleteJOb",id);
        let index = jobs.findIndex(j => j.id == id);

        //console.log("index from deleteJOb", index)
        
        jobs.splice(index, 1);
        
    }
}

//  jobs array
export const jobs =[
    new JobModel(
        1,
        'Coding Ninjas',
        'Tech',
        'SDE',
        'Gurgaon HR IND Remote',
        '14-20lpa',
        ['REACT', 'NodeJs', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        "30 Aug 2023",
        5,
    ),
    new JobModel(
        2,
        'Go Digit',
        'Tech',
        'Angular Developer',
        'Pune IND On-Site',
        '6-10lpa',
        ['Angular', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        "30 Aug 2023",
        7,
    ),
    new JobModel(
        3,
        'Juspay',
        'Tech',
        'SDE',
        'Bangalore IND',
        '20-26lpa',
        ['REACT', 'NodeJs', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        "30 Aug 2023",
        3,
    ),
];
