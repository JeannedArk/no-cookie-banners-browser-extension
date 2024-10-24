const logger = new Logger("Popup", true);

function updatePopup() {
    logger.log("DOMContentLoaded")
    const indicatorElement = document.getElementById('indicator');

    function updateCookiesFound(cookiesFound) {
        if (cookiesFound) {
            indicatorElement.classList.add('active');
        } else {
            indicatorElement.classList.remove('active');
        }
    }

    addListenerToStorage(function(changes, namespace) {
        if (Constants.Storage.KEY_DECLINE_COOKIE_BUTTON_PRESSED in changes) {
            const declineCookieButtonPressed = !!changes[Constants.Storage.KEY_DECLINE_COOKIE_BUTTON_PRESSED].newValue;
            logger.log("+++ Storage onChanged", {changes, declineCookieButtonPressed});
            updateCookiesFound(declineCookieButtonPressed);
        }
    });

    getFromStorage(Constants.Storage.KEY_DECLINE_COOKIE_BUTTON_PRESSED, function (storageData) {
        const declineCookieButtonPressed = !!storageData[Constants.Storage.KEY_DECLINE_COOKIE_BUTTON_PRESSED];
        logger.log("+++ Storage GET", {storageData, declineCookieButtonPressed});
        updateCookiesFound(declineCookieButtonPressed);
    });

    // chrome.runtime.onMessage.addListener((msg, sender) => {
    //     if ((msg.from === 'content') && (msg.subject === 'declineCookieButtonPressed')) {
    //         logger.log("+++ Popup message received")
    //         updateCookiesFound(true);
    //     }
    // });
}

document.addEventListener('DOMContentLoaded', updatePopup);