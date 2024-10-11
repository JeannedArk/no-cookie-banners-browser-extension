/**
 * @type {string[]}
 */
const BUTTON_COOKIE_DECLINE_TEXTS = [
    // English
    "reject additional cookies",
    "i refuse analytics cookies",
    "reject all cookies",
    
    // German
    "Nur mit erforderlichen Cookies fortfahren",
    "Optionale Cookies ablehnen",
    "Analyse-Cookie ablehnen",
    "Analyse-Cookies ablehnen",
    
    // Spanish
    "Rechazo las cookies de análisis.",

    // French
    "Je refuse les cookies analytiques",
];

/**
 * @returns {string[]}
 */
function getButtonCookieDeclineTexts() {
    return stringsTrimAndToLowerCase(BUTTON_COOKIE_DECLINE_TEXTS);
}


const DECLINE_TEXTS = [
    // English
    "Decline",
    "Reject",
    "no thanks",

    // German
    "Ablehnen",
    "Nein danke",
];

/**
 * @returns {string[]}
 */
function getDeclineTexts() {
    return stringsTrimAndToLowerCase(DECLINE_TEXTS);
}