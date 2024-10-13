let logger = new Logger("NoCookieBanners", true);
let declineCookieButtonPressed = false;
const TIMEOUT_DELAYED_SEARCH = 2000;

function clickCookieBanner() {
  logger.log("clickCookieBanner");
  const cookieButtons = getAllCookieDeclineButtons();
  const cookieButtonTexts = cookieButtons.map((cookieButton) => cookieButton.textContent);
  logger.log("cookieButtons", {cookieButtonTexts, cookieButtons});
  if (cookieButtons?.length) {
    cookieButtons.forEach((cookieButton) => {
      cookieButton.click();
    });
    declineCookieButtonPressed = true;
  }
}

function clickCookieBannerWhenNotTriggered() {
  logger.log("clickCookieBannerWhenNotTriggered", {declineCookieButtonPressed});
  if (!declineCookieButtonPressed) {
    clickCookieBanner();
  }
}

function clickCookieBannerWhenPageReady() {
  logger.log("Start");
  
  window.addEventListener('load', function () {
    logger.log("clickCookieBannerWhenPageReady event load");
    clickCookieBannerWhenNotTriggered();
  });
  
  setTimeout(() => {
    logger.log("clickCookieBannerWhenPageReady event delayed");
    clickCookieBannerWhenNotTriggered();
  }, TIMEOUT_DELAYED_SEARCH);
}

function getHTMLElementsWithinIframes(querySelector) {
  return Array.from(document.querySelectorAll('iframe'))
    .map(iframe => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        return Array.from(iframeDocument.querySelectorAll(querySelector));
      } catch (error) {
        // console.warn("Cannot access iframe due to cross-origin restrictions:", {error, iframe});
        return [];
      }
    })
    .flat();
}

function isHTMLElementVisible(htmlElement) {
  const style = window.getComputedStyle(htmlElement);
  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

function getCookieDeclineHTMLElementsSingleLabeledButton(querySelector) {
  const buttonsDocument = Array.from(document.querySelectorAll(querySelector)) || [];
  // const buttonsIframe = getHTMLElementsWithinIframes();
  const buttons = buttonsDocument;

  const cookieButtonTexts = buttons.map((cookieButton) => cookieButton.textContent);
  const cookieButtonDeclineTexts = getButtonCookieDeclineTexts();
  logger.log("getCookieDeclineHTMLElementsSingleLabeledButton", {cookieButtonTexts, buttons});
  return buttons
    .filter(isHTMLElementVisible)
    .filter((button) => {
      const buttonText = stringTrimAndToLowerCase(button.textContent);
      return cookieButtonDeclineTexts.includes(buttonText);
    });
}

function getCookieDeclineHTMLElementsInFlatMenu(querySelector) {
  const declineTexts = getDeclineTexts();
  return Array.from(document.querySelectorAll('div'))
    .map(div => {
      const divText = stringTrimAndToLowerCase(div.textContent);
      const isCookieContext = divText.includes('cookie');
      
      if (isCookieContext) {
        logger.log("getCookieDeclineHTMLElementsInFlatMenu", {divText, isCookieContext});
        // Check if it contains a child element
        const buttons = Array.from(div.querySelectorAll(querySelector));
        const cookieButtonTexts = buttons.map((cookieButton) => cookieButton.textContent);
        logger.log("getCookieDeclineHTMLElementsInFlatMenu", {cookieButtonTexts});
        return buttons
          .filter(isHTMLElementVisible)
          .filter((button) => {
            const buttonText = stringTrimAndToLowerCase(button.textContent);
            return declineTexts.some(declineText => buttonText.includes(declineText));
          });
      } else {
        return [];
      } 
    })
    .flat();
}

function getAllCookieDeclineHTMLElements(querySelector) {
  const buttonsSingleLabeledButton = getCookieDeclineHTMLElementsSingleLabeledButton(querySelector);
  const buttonsInFlatMenu = getCookieDeclineHTMLElementsInFlatMenu(querySelector);
  
  // Deduplication
  return Array.from(new Set([...buttonsSingleLabeledButton, ...buttonsInFlatMenu]));
}

function getAllCookieDeclineButtons() {
  return getAllCookieDeclineHTMLElements('button, span, a');
}

clickCookieBannerWhenPageReady();