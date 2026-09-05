const readFiles = require("./src/file-reader");
const analyzeFile = require("./src/stream-analyzer");
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

        //Old
        //console.log("Files:", files.map(file => file.file));
        //<--New
        console.log("Files:", files);

        //old fs.readFile().....
        // const results = files.map((file) => {
        //     const analysis = analyzeContent(file.content);

        //     return {
        //         file: file.file,
        //         ...analysis
        //     };
        // });
        
        //wait untill all 4 file analyses have completed.
        const results = await Promise.all(
            files.map(file => analyzeFile(file))
        );

        const summary = aggregateResults(results);
        
        printReport(summary);
        writeJsonReport(summary);
        
        console.log("File analyzer ends.");
    }
    catch (error) {
        console.log("Unable to process files.");
        console.log(error.message);
    }
}

processFiles();

