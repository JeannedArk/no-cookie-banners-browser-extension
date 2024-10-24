function getHTMLElementsWithinIframes(querySelector) {
    return Array.from(document.querySelectorAll('iframe'))
        .map(iframe => {
            try {
                const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                return Array.from(iframeDocument.querySelectorAll(querySelector));
            } catch (error) {
                // Cannot access iframe due to cross-origin restrictions
                return [];
            }
        })
        .flat();
}

function isHTMLElementVisible(htmlElement) {
    const style = window.getComputedStyle(htmlElement);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

function getHTMLElementsSingleLabeledButton(querySelector, textWhitelist, fullMatch) {
    const buttons = Array.from(document.querySelectorAll(querySelector)) || [];
    return buttons
        .filter(isHTMLElementVisible)
        .filter((button) => {
            return fullMatch
                ? fullTextMatch(textWhitelist, button.textContent)
                : partialTextMatch(textWhitelist, button.textContent);
        });
}

function getCookieDeclineHTMLElementsSingleLabeledButton(querySelector) {
    const cookieButtonDeclineTexts = getButtonCookieDeclineTexts();
    return getHTMLElementsSingleLabeledButton(querySelector, cookieButtonDeclineTexts, true);
}

function getCookieDeclineHTMLElementsInFlatMenu(querySelector) {
    const declineTexts = getDeclineTexts();
    return Array.from(document.querySelectorAll('div'))
        .map(div => {
            const divText = stringTrimAndToLowerCase(div.textContent);
            const isCookieContext = divText.includes('cookie');

            if (isCookieContext) {
                logger.log("getCookieDeclineHTMLElementsInFlatMenu", { divText, isCookieContext });
                // Check if it contains a child element
                const buttons = Array.from(div.querySelectorAll(querySelector));
                const buttonsTexts = buttons.map((cookieButton) => cookieButton.textContent);
                logger.log("getCookieDeclineHTMLElementsInFlatMenu", { buttonsTexts });
                return buttons
                    .filter(isHTMLElementVisible)
                    .filter((button) => partialTextMatch(declineTexts, button.textContent));
            } else {
                return [];
            }
        })
        .flat();
}

function clickSettingsButtonAndSearchForDecline(querySelector, settingsButton) {
    settingsButton.click();

    logger.log("--- clickSettingsButtonAndSearchForDecline", {
        settingsButtonText: settingsButton.textContent,
    });

    const settingActionTexts = getSettingActionTexts();
    const settingActionButtons = getHTMLElementsSingleLabeledButton(querySelector, settingActionTexts, false);
    logger.log("clickSettingsButtonAndSearchForDecline", {
        settingActionButtonsTexts: settingActionButtons.map((button) => button.textContent),
        settingActionButtons,
    });
    settingActionButtons.forEach((button) => {
        button.click();
    });
}

function getCookieDeclineHTMLElementsInNestedMenu(querySelector) {
    const settingTexts = getSettingTexts();
    const cookieSettingsButtons = Array.from(document.querySelectorAll('div'))
        .map(div => {
            const divText = stringTrimAndToLowerCase(div.textContent);
            const isCookieContext = divText.includes('cookie');

            if (isCookieContext) {
                // Check if it contains a child element
                const buttons = Array.from(div.querySelectorAll(querySelector));
                return buttons
                    .filter(isHTMLElementVisible)
                    .filter((button) => partialTextMatch(settingTexts, button.textContent));
            } else {
                return [];
            }
        })
        .flat();
    
    return toDeduplicatedArray(cookieSettingsButtons)
        .map((cookieSettingButton) => {
            const fn = () => {
                clickSettingsButtonAndSearchForDecline(querySelector, cookieSettingButton);
            };
            const textContent = cookieSettingButton.textContent;

            return new ClickableExecutor(fn, textContent);
        });
}