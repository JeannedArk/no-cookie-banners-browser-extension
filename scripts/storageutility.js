// TODO sync or local?

function clearStorage() {
    chrome.storage.sync.clear();
}

function putToStorage(key, obj) {
    chrome.storage.sync.set({[key]: obj});
}

function getFromStorage(key, callback) {
    chrome.storage.sync.get([key], callback);
}

function addListenerToStorage(callback) {
    chrome.storage.onChanged.addListener(callback);
}