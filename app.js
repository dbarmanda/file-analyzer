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

const fs = require("fs");

const directory = process.argv[2];
console.log("Directory:", directory);

const files = fs.readdirSync(directory);
console.log("Files:", files);