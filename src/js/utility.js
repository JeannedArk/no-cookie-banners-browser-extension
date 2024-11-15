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

/**
 * Top Level Domains.
 * 
 * This list is not exhaustive. It doesn't need to be exhaustive at the moment as it only needs to work
 * with the domain list.
 */
const TLDs = [
    "ac", "ad", "ae", "aero", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "arpa", "as", "asia", "at",
    "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "biz", "bj", "bm", "bn", "bo", "br",
    "bs", "bt", "bv", "bw", "by", "bz", "ca", "cat", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn",
    "co", "co.uk", "com", "coop", "cr", "cu", "cv", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec",
    "edu", "ee", "eg", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf",
    "gg", "gh", "gi", "gl", "gm", "gn", "gov", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn",
    "hr", "ht",
    "hu", "id", "ie", "il", "im", "in", "info", "int", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jobs",
    "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr",
    "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mil", "mk", "ml", "mm", "mn", "mo",
    "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "name", "nc", "ne", "net",
    "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "org", "pa", "pe", "pf", "pg", "ph", "pk", "pl",
    "pm", "pn", "pr", "pro", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd",
    "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sv", "sy", "sz", "tc", "td",
    "tel", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "tt", "tv", "tw", "tz",
    "ua", "ug", "uk", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "za",
    "zm", "zw",
];
const TLD_PATTERN = TLDs.map(tld => tld.replace(".", "\\.")).join("|");
const TLD_REGEX = new RegExp(`\\.(?:${TLD_PATTERN})$`, "i");

/**
 * Returns the domain of the current visited site. The implementation doesn't cover
 * all corner cases but works with most common use cases.
 * 
 * Examples:
 * www.google.com -> google
 * www.vodafone.co.uk -> vodafone
 * 
 * @returns {string}
 */
function getDomain() {
    let url = window.location.hostname;
    url = url.replace(/.*?:\/\//g, "");
    url = url.replace(/www./g, "");
    return url.replace(TLD_REGEX, "");
}
