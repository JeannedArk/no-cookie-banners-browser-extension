// Importing other JS files did not work, therefore can't use utilities and constants here.

/**
 * Keep in sync with storageutility.js
 */
const chromeStorage = chrome.storage.session;

/**
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/setAccessLevel
 * https://developer.chrome.com/docs/extensions/reference/api/storage#type-AccessLevel
 */
function setAccessLevel() {
    const accessLevel = "TRUSTED_AND_UNTRUSTED_CONTEXTS";
    chromeStorage.setAccessLevel({accessLevel});
}

function handleMessages(msg, sender) {
    if ((msg.from === 'content') && (msg.subject === 'declineCookieButtonPressed')) {
        const payload = msg.payload;
        console.trace("[BACKGROUND] Popup message received", {payload});

        chromeStorage.set({['declineCookieButtonPressed']: payload.declineCookieButtonPressed});
    }
}

try {
    setAccessLevel();
    chrome.runtime.onMessage.addListener(handleMessages);
} catch (e) {
    console.error(e);
}
