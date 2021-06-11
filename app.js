var fs = require('fs');
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2); 

// destructor time for name and github variables!!!!!
const [name, github] = profileDataArgs;

fs.writeFile('index.html', generatePage(name, github), (err)=>{
   if(err) throw err;

   console.log("Portfolio complete! Check out index.html to see the output!");
});


/* reference of input console function from lesson 9.1
const profileDataArgs = process.argv.slice(2, process.argv.length); 


const printProfileData = (profileDataArr)=>{
   profileDataArr.forEach(item=> console.log(item));
};

printProfileData(profileDataArgs);
*/ 