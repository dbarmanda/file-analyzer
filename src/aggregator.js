function aggregateResults(results){
    const total = results.reduce((summary, result) => {
        summary.totalLines += result.lines;
        summary.totalErrors += result.errorLines;
        summary.totalWarnings += result.warnLines;
        summary.totalInfo += result.infoLines;
        summary.totalCharacters += result.characters;

        return summary;
    }, {
        filesProcessed: results.length,
        totalLines: 0,
        totalErrors: 0,
        totalWarnings: 0,
        totalInfo: 0,
        totalCharacters: 0
    });

    const largestFile = results.reduce((largest, result) => {
        return result.characters > largest.characters
            ? result
            : largest;
    });

    return {
        ...total,
        largestFile: {
            file: largestFile.file,
            characters: largestFile.characters
        }
    };
}

module.exports = aggregateResults;