const inquirer = require("inquirer");
var fs = require('fs');
const generatePage = require('./src/page-template.js');

const promptUser = ()=>{
   return inquirer.prompt([
         {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
         },
         {
            type: 'input',
            name: 'github',
            message: 'Enter your github username',
            validate: githubInput=>{
               if(githubInput){
                  return true;
               }else{
                  console.log('Must enter a value!');
                  return false;
               }
            }
         },
         {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself in the About me section?',
            default: true
         },
         {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout})=>{
               if(confirmAbout){
                  return true;
               }else{
                  return false;
               }
            }
         },
      ]);
};


const promptProject = (portfolioData)=>{
   console.log(`
   =================
   Add a New Project
   =================
   `);
   if(!portfolioData.projects){
      portfolioData.projects = [];
   }
   

   return inquirer.prompt([
      {
         type: 'input',
         name: 'name',
         message: 'What is the name of your project?',
         validate: nameInput=>{
            if(nameInput){
               return true;
            }else{
               console.log("must enter a name");
               return false;
            }
         }
      },
      {
         type: 'input',
         name: 'description',
         message: 'Provide a description of the project (required)',
         validate: descriptionInput=>{
            if(descriptionInput){
               return true;
            }else{
               console.log("Must enter a value!");
               return false;
            }
         }
      },
      {
         type: 'checkbox',
         name: 'languages',
         message: 'What languages did you use to build this project? (check all that apply)',
         choices: ['JavaScript','HTML','CSS','ES6','jQuery','Bootstrap', 'Node']
      },
      {
         type: 'input',
         name: 'link',
         message: 'Enter the Github link to your project. (Required)',
         validate: linkInput=>{
            if(linkInput){
               return true;
            }else{
               console.log("Must enter a value!");
               return false;
            }
         }
      },
      {
         type: 'confirm',
         name: 'feature',
         message: 'Would you like to feature this project?',
         default: false
      },
      {
         type: 'confirm',
         name: 'confirmAddProject',
         message: 'Would you like to enter another project?',
         default: false
      }
   ]).then(projectData=>{
      portfolioData.projects.push(projectData);
      if(projectData.confirmAddProject){
         return promptProject(portfolioData);
      } else{
         return portfolioData;
      }
   });
};



// IMPORTANT  ----- temprarily commenting out promptUser and replacicing code with dummy object mockData ---- revive this code and delete mockData

promptUser()
.then(promptProject)
.then(portfolioData=>{
   
    const pageHTML = generatePage(portfolioData); 
     fs.writeFile('./dist/index.html', pageHTML, err => {
       if (err){
          console.log(err);
          return
       }

       console.log('Page created! Check out index.html in this directory to see it!');
    
         fs.copyFile('./src/style.css', './dist/style.css', err=>{
               if(err){
                  console.log(err);
                  return;
               }

               console.log('Style sheet copied successfully');
         });
      });
});

// end of necessary promptUser code   

 //temporary dummy data 
/*
   const mockData = {
      name: 'thomas',
      github: 'twalker7',
      confirmAbout: true,
      about: 'get on then ',
      projects: [
      {
         name: 'portofolio maker',
         description: 'a way to get hired',
         languages: [Array],
         link: 'github.com/portfolio-maker',
         feature: true,
         confirmAddProject: true
      },
      {
         name: 'weatherAll-pro',
         description: 'weather forecast app',
         languages: [Array],
         link: 'github.com/weatherAll-pro',
         feature: true,
         confirmAddProject: false
      }
      ]
   }
 const pageHTML = generatePage(mockData);

*/













/* commented out from lesson 9.3.5


const pageHTML = generatePage(name, github);

fs.writeFile('index.html', pageHTML, (err)=>{
   if(err) throw err;

   console.log("Portfolio complete! Check out index.html to see the output!");
});

*/ 



/* reference of input console function from lesson 9.1
const profileDataArgs = process.argv.slice(2, process.argv.length); 


const printProfileData = (profileDataArr)=>{
   profileDataArr.forEach(item=> console.log(item));
};

printProfileData(profileDataArgs);
*/ 