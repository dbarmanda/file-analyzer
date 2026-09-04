function analyzeContent(content){
    const trimmedContent = content.trim();

    const lines = trimmedContent === ""
        ? []
        : trimmedContent.split("\n");

    let errorLines = 0;
    let warnLines = 0;
    let infoLines = 0;

    for(const line of lines){
        if(line.includes("ERROR")){
            errorLines++;
        } else if(line.includes("WARN")){
            warnLines++;
        } else if(line.includes("INFO")){
            infoLines++;
        }
    }

    return {
        lines: lines.length,
        errorLines: errorLines,
        warnLines: warnLines,
        infoLines: infoLines,
        characters: content.length
    }
}

module.exports = analyzeContent;