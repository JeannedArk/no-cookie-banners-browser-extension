// Importing other JS files did not work, therefore can't use utilities and constants here.

/**
 * Keep in sync with storageutility.js
 */
const chromeStorage = chrome.storage.session;

/**
 * Keep in sync with constants.js
 */
const msgFromContent = 'content';
const msgSubjectDeclineCookieButtonPressed = 'declineCookieButtonPressed';
const msgSubjectInitStorage = 'initStorage';

/**
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/setAccessLevel
 * https://developer.chrome.com/docs/extensions/reference/api/storage#type-AccessLevel
 * 
 * When using session storage, the access level needs to be set from a trusted context, i.e. from here.
 */
function setAccessLevel() {
    const accessLevel = "TRUSTED_AND_UNTRUSTED_CONTEXTS";
    chromeStorage.setAccessLevel({accessLevel});
}

/**
 * Keep in sync with tabutility.js
 */
async function getCurrentTabId() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab ? ('' + tab.id) : 'undefined';
}

async function removeFromStorage(key) {
    await chromeStorage.remove(key);
}

/**
 * Message from the content script to remove the entry for the current tab in the storage.
 * The content script does not have access to the tabs, therefore sends a message to the
 * background script.
 */
async function clearStorageForTab() {
    const tabId = await getCurrentTabId();
    await removeFromStorage(tabId);
}

async function handleMessages(msg, sender) {
    if (msg.from === msgFromContent && msg.subject === msgSubjectDeclineCookieButtonPressed) {
        const payload = msg.payload;
        console.trace("[BACKGROUND] Message received", {msgSubjectDeclineCookieButtonPressed, payload});

        const tabId = await getCurrentTabId();
        await chromeStorage.set({[tabId]: payload.declineCookieButtonPressed});
    } else if (msg.from === msgFromContent && msg.subject === msgSubjectInitStorage) {
        console.trace("[BACKGROUND] Message received", {msgSubjectInitStorage});
        await clearStorageForTab();
    }
}

try {
    setAccessLevel();
    chrome.runtime.onMessage.addListener(handleMessages);
} catch (e) {
    console.error(e);
}
