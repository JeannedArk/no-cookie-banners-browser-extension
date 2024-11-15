/**
 * https://developer.chrome.com/docs/extensions/reference/api/storage#storage_areas
 * 
 * Use session storage because data doesn't need to be persisted and with local it would
 * need to be explicitly deleted.
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
}
