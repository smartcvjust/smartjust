const MiddleWareObj = require("../../../middleWare");
const cv = require("../../../models/cv");
const user = require("../../../models/user");

var express = require("express"),
    router = express.Router();



// home page
router.get("/my-cv-list" , MiddleWareObj.checkUserLoggedIn, (req, res) => {
    cv.find({addedBy: req.user._id} , (err, foundCvList) => {
        if(err) {
            console.log(err)
            req.flash("error", "Database error...")
            res.redirect("/")
        } else {
            res.render("sitePages/cvList/list", {cvList: foundCvList});
        }
    }) 
});



router.get("/new-cv" , MiddleWareObj.checkUserLoggedIn, (req, res) => {
    res.render("sitePages/cvList/new");
});


router.post("/new-cv" , MiddleWareObj.checkUserLoggedIn, (req, res) => {
    const newCV = {
        personalInformation: {
          fullName: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone,
          dob: req.body.dob,
          address: req.body.address,
          nationality: req.body.nationality,
          jobTitle: req.body.jobTitle,
          website: req.body.website,
        },
        professionalExperience: [
          {
            jobTitle: req.body.jobTitle1,
            company: req.body.company1,
            location: req.body.EXlocation1,
            employmentPeriod: req.body.employmentPeriod1,
            responsibilities: req.body.responsibilities1,
            achievements: req.body.achievements1
          },
          {
            jobTitle: req.body.jobTitle2,
            company: req.body.company2,
            location: req.body.EXlocation2,
            employmentPeriod: req.body.employmentPeriod2,
            responsibilities: req.body.responsibilities2,
            achievements: req.body.achievements2
          }
        ],
        education: [
          {
            degree: req.body.degree1,
            major: req.body.major1,
            institution: req.body.institution1,
            location: req.body.EDlocation1,
            graduationYear: req.body.graduationYear1,
            honors: req.body.honors1
          },
          {
            degree: req.body.degree2,
            major: req.body.major2,
            institution: req.body.institution2,
            location: req.body.EDlocation2,
            graduationYear: req.body.graduationYear2,
            honors: req.body.honors2
          }
        ],
        skills: {
          skillList: req.body.skills.split(",")
        },
        certifications: [
          {
            certificationName: req.body.certificationName1,
            issuingOrganization: req.body.issuingOrganization1,
            certificationDate: req.body.certificationDate1,
            expirationDate: req.body.expirationDate1
          },
          {
            certificationName: req.body.certificationName2,
            issuingOrganization: req.body.issuingOrganization2,
            certificationDate: req.body.certificationDate2,
            expirationDate: req.body.expirationDate2
          }
        ],
        projects: [
          {
            projectTitle: req.body.projectTitle1,
            projectDescription: req.body.projectDescription1,
            projectRole: req.body.projectRole1,
            technologiesUsed: req.body.technologiesUsed1,
          },
          {
            projectTitle: req.body.projectTitle2,
            projectDescription: req.body.projectDescription2,
            projectRole: req.body.projectRole2,
            technologiesUsed: req.body.technologiesUsed2,
          }
        ],
        interestsHobbies: req.body.interestsHobbies,
        bio: req.body.bio,


        addedBy: req.user._id,
        addedByUsername: req.user.username,

    };
    cv.create(newCV , (err, foundCvDB) => {
      if(err) {
          console.log(err)
          req.flash("error", "Database error...")
          res.redirect("/")
      } else {
          req.flash("success", "Your CV was added successfully");
          res.redirect("my-cv-list");
      }
  }) 
});


router.get("/cv/edit/:cvId" , MiddleWareObj.checkUserLoggedIn, (req, res) => {
  cv.findById(req.params.cvId,  (err, foundCv) => {
    if(err) {
      console.log(err)
      req.flash("error", "Database error...")
      res.redirect("/")
    } else {
        
      res.render("sitePages/cvList/edit", {cv: foundCv});
    }
  })
  
});


router.put("/cv/edit/:cvId" , MiddleWareObj.checkUserLoggedIn, (req, res) => {
  const updatedCV = {
    personalInformation: {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      dob: req.body.dob,
      address: req.body.address,
      nationality: req.body.nationality,
      jobTitle: req.body.jobTitle,
      website: req.body.website,
    },
    professionalExperience: [ 
      {
        jobTitle: req.body.jobTitle1,
        company: req.body.company1,
        location: req.body.EXlocation1,
        employmentPeriod: req.body.employmentPeriod1,
        responsibilities: req.body.responsibilities1,
        achievements: req.body.achievements1
      },
      {
        jobTitle: req.body.jobTitle2,
        company: req.body.company2,
        location: req.body.EXlocation2,
        employmentPeriod: req.body.employmentPeriod2,
        responsibilities: req.body.responsibilities2,
        achievements: req.body.achievements2
      }
    ],
    education: [
      {
        degree: req.body.degree1,
        major: req.body.major1,
        institution: req.body.institution1,
        location: req.body.EDlocation1,
        graduationYear: req.body.graduationYear1,
        honors: req.body.honors1
      },
      {
        degree: req.body.degree2,
        major: req.body.major2,
        institution: req.body.institution2,
        location: req.body.EDlocation2,
        graduationYear: req.body.graduationYear2,
        honors: req.body.honors2
      }
    ],
    skills: {
      skillList: req.body.skills.split(",")
    },
    certifications: [
      {
        certificationName: req.body.certificationName1,
        issuingOrganization: req.body.issuingOrganization1,
        certificationDate: req.body.certificationDate1,
        expirationDate: req.body.expirationDate1
      },
      {
        certificationName: req.body.certificationName2,
        issuingOrganization: req.body.issuingOrganization2,
        certificationDate: req.body.certificationDate2,
        expirationDate: req.body.expirationDate2
      }
    ],
    projects: [
      {
        projectTitle: req.body.projectTitle1,
        projectDescription: req.body.projectDescription1,
        projectRole: req.body.projectRole1,
        technologiesUsed: req.body.technologiesUsed1,
      },
      {
        projectTitle: req.body.projectTitle2,
        projectDescription: req.body.projectDescription2,
        projectRole: req.body.projectRole2,
        technologiesUsed: req.body.technologiesUsed2,
      }
    ],
    interestsHobbies: req.body.interestsHobbies,
    bio: req.body.bio,


    addedBy: req.user._id,
    addedByUsername: req.user.username,

  };

  console.log(updatedCV)
  cv.findByIdAndUpdate(req.params.cvId, updatedCV,  (err, foundCv) => {
    if(err) {
      console.log(err)
      req.flash("error", "Database error...")
      res.redirect("/")
    } else {
        req.flash("success", "Your CV updated successfully");
        res.redirect("/cv-details/" + req.params.cvId)
    }
  })
  
  
});

router.get("/cv-details/:cvId" , MiddleWareObj.checkUserLoggedIn, (req, res) => {
  cv.findById(req.params.cvId, (err, foundCv) => {
    if(err) {
      console.log(err)
      req.flash("error", "Database error...")
      res.redirect("/")
    } else {
      res.render("sitePages/cvList/details", {cv: foundCv});
    }
  })
});


const OpenAI = require("openai");

const openai = new OpenAI({apiKey: 'sk-proj-bbHCbT2yi7nz3xgbH9IhT3BlbkFJ8IsGBuomNENgFpi3jvx3'});
 

router.get("/cv/:cvId/find-job", MiddleWareObj.checkUserLoggedIn, async (req, res) => {
  


  cv.findById(req.params.cvId, async (err, foundCv) => {
    if(err) {
      console.log(err)
      req.flash("error", "Database error...")
      res.redirect("/")
    } else {
      try {
 
        // const cvInfoPrompt = `
        //     CV Information:
        //     Experience: 5 years in software development
        //     Skills: Java Script
        //     Location: Dubai, UAE
        // `;
        var cvInfoPrompt = `
          CV INFORMATION:
          \n
          Job Title: ${foundCv.personalInformation.jobTitle}
          \n
          Skills: ${foundCv.skills.skillList}
          \n
          Location: ${foundCv.personalInformation.address}

          Education1: ${foundCv.education[0].degree} in ${foundCv.education[0].major} (Graduation Year: ${foundCv.education[0].graduationYear}) (Location: ${foundCv.education[0].location}) (Institution: ${foundCv.education[0].institution}) (Honors: ${foundCv.education[0].honors}) 
          \n
          ${(foundCv.education[1].degree && foundCv.education[1].major && foundCv.education[1].graduationYear && foundCv.education[1].location) ? 
          `Education2: ${foundCv.education[1].degree} of ${foundCv.education[1].major} (Graduation Year: ${foundCv.education[1].graduationYear}) (Location: ${foundCv.education[1].location}) (Institution: ${foundCv.education[1].institution}) (Honors: ${foundCv.education[1].honors})` : ''}
      
          \n 
          Experience1: ${foundCv.professionalExperience[0].jobTitle} in ${foundCv.professionalExperience[0].company} (Location: ${foundCv.professionalExperience[0].location}) (Employment Period: ${foundCv.professionalExperience[0].employmentPeriod}) (Responsibilities: ${foundCv.professionalExperience[0].responsibilities})  (Achievements: ${foundCv.professionalExperience[0].achievements}) 
          \n
          ${( foundCv.professionalExperience[1].jobTitle && foundCv.professionalExperience[1].company && foundCv.professionalExperience[1].location && foundCv.professionalExperience[1].responsibilities) ? 
          `Experience1: ${foundCv.professionalExperience[1].jobTitle} in ${foundCv.professionalExperience[1].company} (Location: ${foundCv.professionalExperience[1].location}) (Employment Period: ${foundCv.professionalExperience[1].employmentPeriod}) (Responsibilities: ${foundCv.professionalExperience[1].responsibilities})  (Achievements: ${foundCv.professionalExperience[1].achievements})` : ''}
      
          \n 
          Certifications1:  (Certification Name: ${foundCv.certifications[0].certificationName}) (Issuing Organization: ${foundCv.certifications[0].issuingOrganization}) (Certification Date: ${foundCv.certifications[0].certificationDate})  (Expiration Date: ${foundCv.certifications[0].expirationDate}) 
          \n
          ${( foundCv.certifications[1].certificationName && foundCv.certifications[1].issuingOrganization && foundCv.certifications[1].certificationDate && foundCv.certifications[1].expirationDate) ? 
          `Certifications2:  (Certification Name: ${foundCv.certifications[1].certificationName}) (Issuing Organization: ${foundCv.certifications[1].issuingOrganization}) (Certification Date: ${foundCv.certifications[1].certificationDate})  (Expiration Date: ${foundCv.certifications[1].expirationDate})` : ''}
    
    
     `;
        
       console.log(cvInfoPrompt)
        // const query = "I'm looking for a new job places based on my CV information";
        const query = `I'm looking for new job opportunities. Here is my CV information: 

            Can you suggest some companies I should apply to based on my location (${foundCv.personalInformation.address})`;

        // Send the prompt and query to ChatGPT
        const completion = await openai.completions.create({
          model: 'gpt-3.5-turbo-instruct',
          prompt: cvInfoPrompt + query,
          max_tokens: 1000
      });
        
        // Process the response from ChatGPT
        const jobRecommendations = completion.choices;
      
        // Output job recommendations
        console.log(jobRecommendations);
        
        // Send the job recommendations back in the response or render them on a page
        // res.send(jobRecommendations)
        res.render("sitePages/cvList/jobResponse", {cv: foundCv, chatGptJobRecommendations: jobRecommendations[0].text});
      } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching job recommendations');
      }
      
    }
  })

})










module.exports = router;