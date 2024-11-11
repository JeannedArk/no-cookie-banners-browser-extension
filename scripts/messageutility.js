async function sendMessage(msg) {
    return chrome.runtime.sendMessage(msg);
}
