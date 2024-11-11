const chromeStorage = chrome.storage.sync;

function clearStorage() {
    chromeStorage.clear();
}

/**
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/setAccessLevel
 * https://developer.chrome.com/docs/extensions/reference/api/storage#type-AccessLevel
 */
async function setAccessLevel() {
    const accessLevel = "TRUSTED_AND_UNTRUSTED_CONTEXTS";
    await chrome.storage.session.setAccessLevel({accessLevel});
}

function putToStorage(key, obj) {
    chromeStorage.set({[key]: obj});
}

function getFromStorage(key, callback) {
    chromeStorage.get([key], callback);
}

function addListenerToStorage(callback) {
    chromeStorage.onChanged.addListener(callback);
    // chrome.storage.onChanged.addListener(callback);
}

function initStorage() {
    clearStorage();
}