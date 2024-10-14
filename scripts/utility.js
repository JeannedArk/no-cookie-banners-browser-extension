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

/**
 * @returns {boolean}
 */
function fullTextMatch(whitelist, text) {
    const sanitizedText = stringTrimAndToLowerCase(text);
    return sanitizedText != "" && whitelist.includes(sanitizedText);
}

/**
 * @returns {boolean}
 */
function partialTextMatch(whitelist, text) {
    const sanitizedText = stringTrimAndToLowerCase(text);
    return whitelist.some(whitelistText => sanitizedText.includes(whitelistText));
}

function toDeduplicatedArray(elements) {
    return Array.from(new Set(elements));
}