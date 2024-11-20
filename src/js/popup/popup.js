const logger = new Logger("Popup", false);

function updatePopup() {
    logger.trace("updatePopup DOMContentLoaded");
    const indicatorElement = document.getElementById('indicator');

    function updateCookiesFound(cookiesFound) {
        if (cookiesFound) {
            indicatorElement.classList.add('active');
        } else {
            indicatorElement.classList.remove('active');
        }
    }

    getCurrentTabId().then((tabId) => {
        addListenerToStorage(function(changes, namespace) {
            if (tabId in changes) {
                const declineCookieButtonPressed = !!changes[tabId].newValue;
                logger.trace("addListenerToStorage", {declineCookieButtonPressed, changes});
                updateCookiesFound(declineCookieButtonPressed);
            }
        });
    
        getFromStorage(tabId, function (storageData) {
            const declineCookieButtonPressed = !!storageData[tabId];
            logger.trace("getFromStorage", {declineCookieButtonPressed, storageData});
            updateCookiesFound(declineCookieButtonPressed);
        });
    });
}

document.addEventListener('DOMContentLoaded', updatePopup);