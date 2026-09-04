


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
const path = require("path");
const { text } = require("stream/consumers");

const directory = process.argv[2];
const extension = process.argv[3];

if(!directory || !extension){
    console.log("Usage: node app.js <directory> <extension>");
    process.exit(1);
}
console.log("File analyzer started.");

console.log("Directory:", directory);
console.log("Extension:", extension);


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

    const matchingFiles = files.filter((file)=>{
        return path.extname(file) == extension;
    });

    console.log("Matching files:", matchingFiles);

    if(matchingFiles.length == 0){
        console.log(`No files found with extension: ${extension}`);
        return;
    }
    

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

    const promises = matchingFiles.map((file) => {
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
            

            const results = contents.map((content, index) => {
                //For empty file returns 1 for each
                // const lines = content.trim().split("\n");
                // const words = content.trim().split(/\s+/);

                const trimmedContent = content.trim();
                const lines = trimmedContent === "" ? [] : trimmedContent.split("\n");
                const words = trimmedContent === "" ? [] : trimmedContent.split(/\s+/);

                const characters = content.length;
                const longestLine = lines.reduce((longest, line) => {
                    return line.length > longest.length ? line : longest;
                }, "");

                return {
                    file: matchingFiles[index],
                    lines: lines.length,
                    words: words.length,
                    characters: characters,
                    longestLine: longestLine
                };
            });

            const totalLines = results.reduce((total, result) => {
                return total + result.lines;
            }, 0);

            const totlaWords = results.reduce((total, result) => {
                return total + result.words;
            }, 0);

            const totalCharacters = results.reduce((total, result) => {
                return total + result.characters;
            }, 0);

            // console.log("Analysis results:");
            // console.log(results);
            console.log("\nTotal:");
            console.log("Lines:", totalLines);
            console.log("Words:", totlaWords);
            console.log("Characters:", totalCharacters);

            const largestFile = results.reduce((largest, result) => {
                return result.characters > largest.characters ? result: largest;
            });
            console.log("\nLargest file:");
            console.log("File:", largestFile.file);
            console.log("Characters:", largestFile.characters);

            const sortedFiles = [...results].sort((a, b)=>{
                return b.characters - a.characters;
            });
            console.log("\nFiles sorted by size: ");

            sortedFiles.forEach((result)=>{
                console.log(`${result.file}: ${result.characters} characters`);
            });
        } catch (error) {
            console.log("Unable to read files");
            console.log(error.message);
        }
    }

    processFiles();
});
console.log("File analyzer ends.");