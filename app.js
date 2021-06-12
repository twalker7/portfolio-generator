const inquirer = require("inquirer");

const promptUser = ()=>{
   return inquirer.prompt([
         {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
         }
      ]);
};

promptUser().then(answers => console.log(answers));




/* commented at from lesson 9.3.5
 var fs = require('fs');
const generatePage = require('./src/page-template.js');

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