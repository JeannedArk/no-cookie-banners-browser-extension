// Importing other JS files did not work, therefore can't use utilities and constants here.

// chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });

function handleMessages(msg, sender) {
    if ((msg.from === 'content') && (msg.subject === 'declineCookieButtonPressed')) {
        const payload = msg.payload;
        console.trace("[BACKGROUND] Popup message received", {payload});

        chrome.storage.sync.set({['declineCookieButtonPressed']: payload.declineCookieButtonPressed});
    }
}

try {
    // await setAccessLevel();
    chrome.runtime.onMessage.addListener(handleMessages);
} catch (e) {
    console.error(e);
}
