function analyzeContent(content){
    const trimmedContent = content.trim();

    const lines = trimmedContent === ""
        ? []
        : trimmedContent.split("\n");

    const words = trimmedContent === ""
        ? []
        : trimmedContent.split(/\s+/);
    
    const characters = content.length;

    const longestLine = lines.reduce((longest, line) => {
        return line.length > longest.length ? line : longest;
    }, "");

    const averageWordsPerLine = lines.length === 0
        ? 0
        : words.length / lines.length;

    return {
        lines: lines.length,
        words: words.length,
        characters: characters,
        averageWordsPerLine: averageWordsPerLine,
        longestLine: longestLine
    };
}

module.exports = analyzeContent;