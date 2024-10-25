const logger = new Logger("Popup", false);

function updatePopup() {
    logger.trace("DOMContentLoaded");
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
            updateCookiesFound(declineCookieButtonPressed);
        }
    });

    getFromStorage(Constants.Storage.KEY_DECLINE_COOKIE_BUTTON_PRESSED, function (storageData) {
        const declineCookieButtonPressed = !!storageData[Constants.Storage.KEY_DECLINE_COOKIE_BUTTON_PRESSED];
        updateCookiesFound(declineCookieButtonPressed);
    });
}

document.addEventListener('DOMContentLoaded', updatePopup);