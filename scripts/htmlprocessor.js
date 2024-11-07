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
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility
    const style = window.getComputedStyle(htmlElement);
    const rect = htmlElement.getBoundingClientRect();
    return style.display !== 'none'
        && style.visibility !== 'hidden'
        && style.opacity !== '0'
        && rect.width > 0
        && rect.height > 0;
}

function isHTMLElementNotRedirecting(htmlElement) {
    return !htmlElement.href;
}

function getHTMLElementsSingleLabeledButton(
    querySelector,
    textWhitelist,
    fullMatch,
    filterRedirect = true,
    parentTraversalElement = document
) {
    const buttons = Array.from(parentTraversalElement.querySelectorAll(querySelector)) || [];
    return buttons
        .filter(isHTMLElementVisible)
        .filter((button) => {
            return !filterRedirect || isHTMLElementNotRedirecting(button)
        })
        .filter((button) => {
            return fullMatch
                ? fullTextMatch(textWhitelist, button.textContent)
                : partialTextMatch(textWhitelist, button.textContent);
        });
}

/**
 * Returns all HTML elements with a simple strategy trying to find elements which
 * fully match decline or accept texts with high confidence.
 */
function getCookieDeclineOrAcceptHTMLElementsSingleLabeledButton(querySelector) {
    const cookieButtonDeclineTexts = getCookieDeclineTexts();
    const cookieButtonAcceptTexts = getCookieAcceptTexts();
    const texts = [...cookieButtonDeclineTexts, ...cookieButtonAcceptTexts];
    return getHTMLElementsSingleLabeledButton(querySelector, texts, true);
}

function hasHTMLElementNeighboringButtons(querySelector, htmlElement, textWhitelist) {
    // How many levels to go up the DOM tree is more an experienced based heuristic value.
    // The Google cookie popover needs two levels.
    const parent = htmlElement?.parentElement?.parentElement;
    if (!parent) {
        return false;
    }
    const buttons = getHTMLElementsSingleLabeledButton(querySelector, textWhitelist, false, false, parent);
    logger.log("hasHTMLElementNeighboringButtons", {htmlElement, parent, buttons});
    return buttons.length > 0;
}

function hasHTMLElementNeighboringCookieAcceptButton(querySelector, htmlElement) {
    const texts = getAcceptTexts();
    return hasHTMLElementNeighboringButtons(querySelector, htmlElement, texts);
}

function hasHTMLElementNeighboringSettingsButton(querySelector, htmlElement) {
    const texts = getSettingTexts();
    return hasHTMLElementNeighboringButtons(querySelector, htmlElement, texts);
}

/**
 * Returns HTML elements. This strategy does the following:
 * - Check if the visited domain is white listed
 * - Find div tags with a cookie context
 * - Within that div:
 *      - Filter for elements that are visible
 *      - only elements that are not redirecting
 *      - match the decline or accept texts
 *      - have a settings button close by
 */
function getCookieDeclineHTMLElementsInFlatMenu(querySelector) {
    // Only apply this strategy for white listed domains
    const domain = getDomain();
    if (WHITELISTED_DOMAINS_FOR_SIMPLE_FLAT_MENUS.indexOf(domain) == -1) {
        return [];
    }

    const declineAndAcceptTexts = getDeclineAndAcceptTexts();
    return Array.from(document.querySelectorAll('div'))
        .filter(isHTMLElementVisible)
        .filter((element) => element.childElementCount > 0)
        .map(div => {
            const divText = stringTrimAndToLowerCase(div.textContent);
            const isCookieContext = divText.includes('cookie');

            // If the div element is related to cookies, search the subtree
            if (isCookieContext) {
                // In a lot of popovers the cookie text is on the same level as the accept and decline
                // buttons. Therefore, go one level up if possible. This is the case for amazon.com
                // and microsoft.com.
                const parent = div.parentElement ?? div;
                const buttons = Array.from(parent.querySelectorAll(querySelector));
                const buttonsTexts = buttons.map((cookieButton) => cookieButton.textContent);
                logger.log("getCookieDeclineHTMLElementsInFlatMenu", { parent, divText, buttonsTexts });
                return buttons
                    .filter(isHTMLElementVisible)
                    .filter(isHTMLElementNotRedirecting)
                    .filter((button) => partialTextMatch(declineAndAcceptTexts, button.textContent))
                    .filter((button) => hasHTMLElementNeighboringSettingsButton(querySelector, button))
                    ;
            } else {
                return [];
            }
        })
        .flat();
}

function clickSettingsButtonAndSearchForDecline(querySelector, settingsButton) {
    settingsButton.click();

    const settingActionTexts = getSettingActionTexts();
    const settingActionButtons = getHTMLElementsSingleLabeledButton(querySelector, settingActionTexts, false);
    logger.log("clickSettingsButtonAndSearchForDecline", {
        settingsButtonText: settingsButton.textContent,
        settingActionButtonsTexts: settingActionButtons.map((button) => button.textContent),
        settingActionButtons,
    });
    settingActionButtons.forEach((button) => {
        button.click();
    });
}

/**
 * TODO disabled for now because the confidence is sufficiently high enough.
 * 
 * Returns a clickable execution which potentially clicks multiple HTML elements.
 * This strategy targets popovers with forms where there is no decline button displayed.
 * It tries to find the settings button and then clicking a decline, accept or save button
 * to close the popover.
 * 
 * This strategy is the most complex and needs to be careful to click the correct elements.
 * Blindly clicking a settings button would create chaos on legitimate sites with cookies
 * as the context, e.g. baking cookies or an article about browser cookies.
 */
function getCookieDeclineHTMLElementsInNestedMenu(querySelector) {
    const settingTexts = getSettingTexts();
    const cookieSettingTexts = getCookiesSettingTexts();

    const cookieSettingsButtons = Array.from(document.querySelectorAll('div'))
        .map(div => {
            const divText = stringTrimAndToLowerCase(div.textContent);
            const isCookieContext = divText.includes('cookie');

            if (isCookieContext) {
                // Check if it contains a child element
                const elements = Array.from(div.querySelectorAll(querySelector));
                const elementsFiltered = elements
                    .filter(isHTMLElementVisible)
                    .filter(isHTMLElementNotRedirecting);

                // Elements matching with cookie settings texts, i.e. high confidence
                const buttonsCookieSettings = elementsFiltered
                    .filter((button) => partialTextMatch(cookieSettingTexts, button.textContent));

                // Elements only matching with settings texts, i.e. lower confidence
                // hence additional filtering on neighboring typical buttons
                const buttonsSettings = elementsFiltered
                    .filter((button) => partialTextMatch(settingTexts, button.textContent))
                    .filter((button) => hasHTMLElementNeighboringCookieAcceptButton(querySelector, button));

                return [...buttonsCookieSettings, ...buttonsSettings];
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

            return new ClickableExecutor(fn, textContent, cookieSettingButton);
        });
}