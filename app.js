const analyzeContent = require("./src/analyzer");
const readFiles = require("./src/file-reader");
const aggregateResults = require("./src/aggregator");
const {
    printReport,
    writeJsonReport
} = require("./src/reporter");


const directory = process.argv[2];
const extension = process.argv[3];

if(!directory || !extension){
    console.log("Usage: node app.js <directory> <extension>");
    process.exit(1);
}
console.log("File analyzer started.");

console.log("Directory:", directory);
console.log("Extension:", extension);

async function processFiles() {
    try {
        const files = await readFiles(directory, extension);

        if (files.length === 0) {
            console.log(`No files found with extension: ${extension}`);
            return;
        }

        console.log("Files:", files.map(file => file.file));

        const results = files.map((file) => {
            const analysis = analyzeContent(file.content);

            return {
                file: file.file,
                ...analysis
            };
        });
        
        const summary = aggregateResults(results);
        
        printReport(summary);
        writeJsonReport(summary);
        
    }
    catch (error) {
        console.log("Unable to process files.");
        console.log(error.message);
    }
}

processFiles();
console.log("File analyzer ends.");

