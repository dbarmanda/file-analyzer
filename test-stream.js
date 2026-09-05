const readFiles = require("./src/file-reader");
const analyzeFile = require("./src/stream-analyzer");

async function test() {
    try {
        const result = await analyzeFile("./logs/server.log");
        console.log(result);
        // const files = await readFiles("./logs", ".log");
        // console.log(files);
    } catch (error) {
        console.log(error.message);
    }
}

test();