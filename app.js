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

//doesn't directly return the file contents.
//returns promise:
function readFile(filePath){
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (error, data) => {
            if(error){
                reject(error);
                return;
            }
            resolve(data);
        });
    });
}

fs.readdir(directory, (error, files)=>{
    if(error){
        console.log("Unable to read directory.");
        console.log(error.message);
        return;
    }
    console.log("Files:", files);

    // //starts multiple async operations, but we currently have no wawy to know when all of them have finished
    // //comes Promises and Promise.all().
    // files.forEach((file)=>{
    //     const filePath = `${directory}/${file}`;

    //     fs.readFile(filePath, "utf8", (error, data)=>{
    //         if(error){
    //             console.log("Unable to read file.");
    //             console.log(error.message);
    //             return;
    //         }
    //         console.log(`\n--- ${file} ---`);
    //         console.log(data);
    //     });
    // //this forEach means-->    
    // //start read file 1
    // // start read file 2
    // // finish forEach
    // // ...
    // // callbacks execute when their reads finish   => thus need promises.
    // });

    const promises = files.map((file) => {
        const filePath = `${directory}/${file}`;
        return readFile(filePath);
    });

    // Promise.all(promises)
    //     .then((contents) => {
    //         console.log("All files have been read.");
    //         console.log(contents);
    //     })
    //     .catch((error) => {
    //         console.log("Unable to read files.");
    //         console.log(error.message);
    //     });
    // // adding modern async await to handle promises.

    async function processFiles() {
        try {
            const contents = await Promise.all(promises);
            console.log("All files have been read.");
            //console.log(contents);
            contents.forEach((content, index) => {
                const lines = content.trim().split("\n");
                const words = content.trim().split(/\s+/);
                const characters = content.length;
                const longestLine = lines.reduce((longest, line) => {
                    return line.length > longest.length ? line : longest;
                });

                console.log(`File ${index + 1}:`);
                console.log("Lines:", lines.length);
                console.log("Words:", words.length);
                console.log("Characters:", characters);
                console.log("Longest line:", longestLine);
            });
        } catch (error) {
            console.log("Unable to read files");
            console.log(error.message);
        }
    }

    processFiles();
});
console.log("File analyzer ends.");