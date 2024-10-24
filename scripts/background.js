// Importing other JS files did not work, therefore can't use utilities and constants here.

function handleMessages(msg, sender) {
    if ((msg.from === 'content') && (msg.subject === 'declineCookieButtonPressed')) {
        console.trace("[BACKGROUND] Popup message received", {msg});

        chrome.storage.sync.set({['declineCookieButtonPressed']: msg.payload});
    }
}

try {
    chrome.runtime.onMessage.addListener(handleMessages);
} catch (e) {
    console.error(e);
}
