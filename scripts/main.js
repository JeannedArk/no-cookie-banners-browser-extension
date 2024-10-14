let logger = new Logger("NoCookieBanners", true);
let declineCookieButtonPressed = false;
const TIMEOUT_DELAYED_SEARCH = 2000;

function clickCookieBanner() {
  const cookieButtons = getAllCookieDeclineButtons();
  const cookieButtonTexts = cookieButtons.map((cookieButton) => cookieButton.textContent);
  logger.log("clickCookieBanner", {cookieButtonTexts, cookieButtons});
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

function getAllCookieDeclineHTMLElements(querySelector) {
  const buttonsSingleLabeledButton = getCookieDeclineHTMLElementsSingleLabeledButton(querySelector);
  const buttonsInFlatMenu = getCookieDeclineHTMLElementsInFlatMenu(querySelector);
  const buttonsInNestedMenu = getCookieDeclineHTMLElementsInNestedMenu(querySelector);
  
  // Deduplication
  return toDeduplicatedArray([...buttonsSingleLabeledButton, ...buttonsInFlatMenu, ...buttonsInNestedMenu]);
}

function getAllCookieDeclineButtons() {
  return getAllCookieDeclineHTMLElements('button, span, a');
}

clickCookieBannerWhenPageReady();