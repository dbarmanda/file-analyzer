const fs = require("fs");
const path = require("path");

function analyzeFile(filePath){

    return new Promise((resolve, reject) => {
        let lines = 0;
        let errorLines = 0;
        let warnLines = 0;
        let infoLines = 0;
        let characters = 0;

        let buffer = "";

        function processLine(line){
            lines++;
                if(line.includes("ERROR")){
                    errorLines++;
                }
                if(line.includes("WARN")){
                    warnLines++;
                }
                if(line.includes("INFO")){
                    infoLines++;
                }
        }

        const stream = fs.createReadStream(filePath, {
            encoding: "utf8"
        });

        stream.on("data", (chunk) => {
            characters += chunk.length;

            buffer += chunk;
            const completeLines = buffer.split("\n");
            buffer = completeLines.pop();

            for(const line of completeLines){
                processLine(line);
            }
        });

        stream.on("end", () => {
            if(buffer.length > 0){
                processLine(buffer);
            }

            resolve({
                file: path.basename(filePath),
                lines,
                errorLines,
                warnLines,
                infoLines,
                characters
            });
        });

        stream.on("error", (error) => {
            reject(error);
        });
    });
}
module.exports = analyzeFile;
