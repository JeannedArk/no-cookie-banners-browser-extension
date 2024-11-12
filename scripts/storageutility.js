/**
 * https://developer.chrome.com/docs/extensions/reference/api/storage#storage_areas
 */
const chromeStorage = chrome.storage.session;

async function clearStorage() {
    await chromeStorage.clear();
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

async function initStorage() {
    await clearStorage();
}