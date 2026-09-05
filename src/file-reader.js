const fs = require("fs");
const path = require("path");


function readFiles(directory, extension){
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (error, files) => {
            if(error){
                reject(error);
            }

            // const matchingFiles = files.filter((file) => {
            //     return path.extname(file) === extension;
            // });

            // if (matchingFiles.length === 0) {
            //     return [];
            // }

            // return matchingFiles.map((file) => {
            //     return path.join(directory, file);
            // });

            const matchingFiles = files
                .filter(file => path.extname(file) === extension)
                .map(file => path.join(directory, file));

            resolve(matchingFiles);
        });
    });
}

//<---- This will now be handled by stream-analyzer.js
// function readFile(filePath){
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, "utf8", (error, data) => {
//             if(error){
//                 reject(error);
//                 return;
//             }
//             resolve(data);
//         });
//     });
// }

//<---- Old readFiles
// async function readFiles(directory, extension){
//     const files = await new Promise((resolve, reject) => {
//         fs.readdir(directory, (error, files) => {
//             if(error){
//                 reject(error);
//                 return;
//             }
//             resolve(files);
//         });
//     });

//     const matchingFiles = files.filter((file) => {
//         return path.extname(file) === extension;
//     });

//     if(matchingFiles.length === 0){
//         return [];
//     }

//     const contents = await Promise.all(
//         matchingFiles.map((file) => {
//             const filePath = `${directory}/${file}`;
//             return readFile(filePath);
//         })
//     );

//     return contents.map((content, index) => {
//         return{
//             file: matchingFiles[index],
//             content: content
//         }
//     });
// }

module.exports = readFiles;