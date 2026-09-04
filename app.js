const fs = require("fs");
const path = require("path");
const analyzeContent = require("./src/analyzer");

const directory = process.argv[2];
const extension = process.argv[3];

if(!directory || !extension){
    console.log("Usage: node app.js <directory> <extension>");
    process.exit(1);
}
console.log("File analyzer started.");

console.log("Directory:", directory);
console.log("Extension:", extension);

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
    
    const promises = matchingFiles.map((file) => {
        const filePath = `${directory}/${file}`;
        return readFile(filePath);
    });

    async function processFiles() {
        try {
            const contents = await Promise.all(promises);
            console.log("All files have been read.");
            //console.log(contents);
            

            const results = contents.map((content, index) => {
                const analysis = analyzeContent(content);
                return {
                    file: matchingFiles[index],
                    ...analysis
                };
            });

            console.log("\nAnalysis results:");

            results.forEach((result) => {
                console.log(`\nFile: ${result.file}`);
                console.log("Lines:", result.lines);
                console.log("Words:", result.words);
                console.log("Characters:", result.characters);
                console.log("Average words per line:", result.averageWordsPerLine);
                console.log("Longest line:", result.longestLine);
            });

            const totalLines = results.reduce((total, result) => {
                return total + result.lines;
            }, 0);

            const totalWords = results.reduce((total, result) => {
                return total + result.words;
            }, 0);

            const totalCharacters = results.reduce((total, result) => {
                return total + result.characters;
            }, 0);

            // console.log("Analysis results:");
            // console.log(results);
            console.log("\nTotal:");
            console.log("Lines:", totalLines);
            console.log("Words:", totalWords);
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