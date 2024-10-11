/**
 * @returns {string}
 */
function stringTrimAndToLowerCase(str) {
    return str.trim().toLowerCase();
}

/**
 * @returns {string[]}
 */
function stringsTrimAndToLowerCase(strings) {
    return strings.map(stringTrimAndToLowerCase);
}