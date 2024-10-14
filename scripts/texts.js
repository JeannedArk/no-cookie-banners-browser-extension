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
    "not agree",

    // German
    "Ablehnen",
    "Nein danke",

    // Spanish
    "Rechazar",

    // French
    "refuser",

    // Dutch
    "weigeren"
];

/**
 * @returns {string[]}
 */
function getDeclineTexts() {
    return stringsTrimAndToLowerCase(DECLINE_TEXTS);
}


const SETTING_TEXTS = [
    // English
    "Settings",
    "Configure",

    // German
    "Einstellungen",
    "anpassen",
    "verwalten",
];

/**
 * @returns {string[]}
 */
function getSettingTexts() {
    return stringsTrimAndToLowerCase(SETTING_TEXTS);
}


const SETTING_SAVE_TEXTS = [
    // English
    // "Settings",
    "Save",

    // German
    "speichern",
];

const SETTING_ACTION_TEXTS = [...DECLINE_TEXTS, ...SETTING_SAVE_TEXTS];

/**
 * @returns {string[]}
 */
function getSettingActionTexts() {
    return stringsTrimAndToLowerCase(SETTING_ACTION_TEXTS);
}