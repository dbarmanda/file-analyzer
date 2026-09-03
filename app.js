console.log("File analyzer started.");


//1. What is process, arg vector(CLI)?
//const args = process.argv;
//console.log(args);

//<- Output.
// dbarm@dave:~/practice/node-practice/file-analyzer$ node app.js ./test-files
// File analyzer started.
// [
//   '/home/dbarm/.nvm/versions/node/v24.20.0/bin/node',
//   '/home/dbarm/practice/node-practice/file-analyzer/app.js',
//   './test-files'
// ]


//2. Sync fs read:
// try {
//     const files = fs.readdirSync(directory);
//     console.log("Files:", files);
// } catch (error) {
//     console.log("Unable to read directory.");
//     console.log(error.message);
// }


const fs = require("fs");

const directory = process.argv[2];
console.log("Directory:", directory);

fs.readdir(directory, (error, files)=>{
    if(error){
        console.log("Unable to read directory.");
        console.log(error.message);
        return;
    }
    console.log("Files:", files);
});
console.log("File analyzer ends.");