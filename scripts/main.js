let logger = new Logger("NoCookieBanners", false);
let declineCookieButtonPressed = false;
const TIMEOUT_DELAYED_SEARCH = 2000;

async function clickCookieBanner() {
  const cookieButtons = getAllCookieDeclineButtons();
  const cookieButtonTexts = cookieButtons.map((cookieButton) => cookieButton.textContent);
  logger.log("clickCookieBanner", {cookieButtonTexts, cookieButtons});
  if (cookieButtons?.length) {
    cookieButtons.forEach((cookieButton) => {
      cookieButton.click();
    });
    declineCookieButtonPressed = true;
    
    try {
      const msg = {
        from: 'content',
        subject: 'declineCookieButtonPressed',
        payload: declineCookieButtonPressed,
      };
      await chrome.runtime.sendMessage(msg);
    } catch (e) {
      logger.error(e);
    }
  }
}

async function clickCookieBannerWhenNotTriggered() {
  logger.log("clickCookieBannerWhenNotTriggered", {declineCookieButtonPressed});
  if (!declineCookieButtonPressed) {
    await clickCookieBanner();
  }
}

async function clickCookieBannerWhenPageReady() {
  logger.log("Start");
  
  window.addEventListener('load', async function () {
    logger.log("clickCookieBannerWhenPageReady event load");
    await clickCookieBannerWhenNotTriggered();
  });
  
  setTimeout(async () => {
    logger.log("clickCookieBannerWhenPageReady event delayed");
    await clickCookieBannerWhenNotTriggered();
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

clearStorage();
clickCookieBannerWhenPageReady();