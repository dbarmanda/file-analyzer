const fs = require("fs");

function printReport(summary){
    console.log("\n===== FILE ANALYZER =====");
    
    console.log("\nFiles processed :", summary.filesProcessed);
    console.log("Total lines    :", summary.totalLines);
    console.log("ERROR lines    :", summary.totalErrors);
    console.log("WARN lines    :", summary.totalWarnings);
    console.log("INFO lines    :", summary.totalInfo);

    console.log("\nLargest file     :", summary.largestFile.file);
    console.log("Largest size   :", summary.largestFile.characters, "bytes");

}

function writeJsonReport(summary){
    fs.writeFileSync(
        "report.json",
        JSON.stringify(summary, null, 2)
    );

    console.log("\nReport generated: report.json");
}

module.exports = {
    printReport,
    writeJsonReport
}