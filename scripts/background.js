// Importing other JS files did not work, therefore can't use utilities and constants here.

console.log("[BACKGROUND] Loaded")

function handleMessages(msg, sender) {
    console.log("[BACKGROUND] Popup message received", {msg});
    if ((msg.from === 'content') && (msg.subject === 'declineCookieButtonPressed')) {
        console.log("[BACKGROUND] Popup message received", {msg});

        chrome.storage.sync.set({['declineCookieButtonPressed']: msg.payload});

        // (async () => {
        //     const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        //     const response = await chrome.tabs.sendMessage(tab.id, msg);
        //     console.log("[BACKGROUND] response", {response});
        // })();
    }
}

try {
    chrome.runtime.onMessage.addListener(handleMessages);
} catch (e) {
    console.error(e);
}
