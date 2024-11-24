/**
 * @type {string[]}
 */
const COOKIE_DECLINE_TEXTS = [
    // English
    "reject additional cookies",
    "I refuse analytics cookies",
    "Reject all cookies",
    "Accept necessary only",
    "Necessary cookies only",
    "Decline optional cookies",
    
    // German
    "Nur mit erforderlichen Cookies fortfahren",
    "Optionale Cookies ablehnen",
    "Analyse-Cookie ablehnen",
    "Analyse-Cookies ablehnen",
    
    // Spanish
    "Rechazo las cookies de análisis",

    // French
    "Je refuse les cookies analytiques",
];

/**
 * @returns {string[]}
 */
function getCookieDeclineTexts() {
    return stringsTrimAndToLowerCase(COOKIE_DECLINE_TEXTS);
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


const COOKIE_ACCEPT_TEXTS = [
    // English
    "Accept all cookies",
    "Accept additional cookies",

    // German
    "Alle Cookies akzeptieren",
    "Cookies akzeptieren",

    // Spanish
    "Aceptar todas las cookies",

    // French
    "Accepter tous les cookies",

    // Dutch
    "Alle cookies accepteren",

    // Italian
    "Accetta tutti i cookie",
];

/**
 * @returns {string[]}
 */
function getCookieAcceptTexts() {
    return stringsTrimAndToLowerCase(COOKIE_ACCEPT_TEXTS);
}


const ACCEPT_TEXTS = [
    // English
    "Accept",

    // German
    "Akzeptieren",

    // Spanish
    "Aceptar",

    // French
    "Accepter",

    // Dutch
    "accepteren",

    // Italian
    "Accetta",
];

/**
 * @returns {string[]}
 */
function getAcceptTexts() {
    return stringsTrimAndToLowerCase(ACCEPT_TEXTS);
}

/**
 * @returns {string[]}
 */
function getDeclineAndAcceptTexts() {
    return stringsTrimAndToLowerCase([...DECLINE_TEXTS, ...ACCEPT_TEXTS]);
}


const COOKIES_SETTING_TEXTS = [
    // English
    "Cookies Settings",
    "Configure cookies",
    "Manage cookies",

    // German
    "Cookie-Einstellungen",
    "Cookies verwalten",
];

/**
 * @returns {string[]}
 */
function getCookiesSettingTexts() {
    return stringsTrimAndToLowerCase(COOKIES_SETTING_TEXTS);
}


const SETTING_TEXTS = [
    // English
    "Settings",
    "Options",
    "Configure",
    "Manage",
    
    // German
    "Einstellungen",
    "Optionen",
    "anpassen",
    "verwalten",

    // Spanish
    "opciones",

    // French
    "options",
    "opzioni",

    // Dutch
    "instellingen",
    "aanpassen",
];

/**
 * @returns {string[]}
 */
function getSettingTexts() {
    return stringsTrimAndToLowerCase(SETTING_TEXTS);
}


const SETTING_SAVE_TEXTS = [
    // English
    "Save",
    "Confirm",

    // German
    "speichern",
];

// const SETTING_ACTION_TEXTS = [...DECLINE_TEXTS, ...SETTING_SAVE_TEXTS];
const SETTING_ACTION_TEXTS = [...COOKIE_DECLINE_TEXTS];

/**
 * @returns {string[]}
 */
function getSettingActionTexts() {
    return stringsTrimAndToLowerCase(SETTING_ACTION_TEXTS);
}