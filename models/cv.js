var mongoose = require("mongoose");

var cvSchema = new mongoose.Schema({
    addedBy: String,
    addedByUsername: String,

    

    personalInformation: {
        fullName: String,
        email: String,
        phone: String,
        dob: String,
        address: String,
        nationality: String,
        jobTitle: String,
        website: String,
      },
      
      // Professional Experience
      professionalExperience: [
        {
          jobTitle: String,
          company: String,
          location: String,
          employmentPeriod: String,
          responsibilities: String,
          achievements: String
        }
      ],
    
      // Education
      education: [
        {
          degree: String,
          major: String,
          institution: String,
          location: String,
          graduationYear: String,
          honors: String
        }
      ],
    
      // Skills
      skills: {
        // You can store skills as an array of strings if multiple skills are allowed
        // Or you can use other data structures depending on your requirements
        skillList: [String]
      },
    
      // Certifications
      certifications: [
        {
          certificationName: String,
          issuingOrganization: String,
          certificationDate: String,
          expirationDate: String
        }
      ],
    
      // Projects
      projects: [
        {
          projectTitle: String,
          projectDescription: String,
          projectRole: String,
          technologiesUsed: String
        }
      ],
    
      // Interests/Hobbies
      interestsHobbies: String,
    
      bio: String
}, { timestamps: {} });


module.exports = mongoose.model("cv" , cvSchema);