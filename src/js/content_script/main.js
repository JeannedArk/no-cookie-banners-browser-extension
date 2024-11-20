let logger = new Logger("NoCookieBanners", false);
let declineCookieButtonPressed = false;
const TIMEOUT_DELAYED_SEARCH = 2000;

function performClick(btn) {
  btn.click();
}

async function sendMessageDeclineCookieButtonPressed(declineCookieButtonPressed) {
  const payload = {
    declineCookieButtonPressed,
  };
  const msg = {
    from: Constants.Message.MSG_FROM_CONTENT,
    subject: Constants.Message.MSG_SUBJECT_DECLINE_COOKIE_BUTTON_PRESSED,
    payload: payload,
  };
  await sendMessage(msg);
}

async function sendMessageInitStorage() {
  const msg = {
    from: Constants.Message.MSG_FROM_CONTENT,
    subject: Constants.Message.MSG_SUBJECT_INIT_STORAGE,
  };
  await sendMessage(msg);
}

async function clickCookieBanner() {
  const cookieButtons = getAllCookieDeclineButtons();
  const cookieButtonTexts = cookieButtons.map((cookieButton) => cookieButton.textContent);
  logger.log("> clickCookieBanner", {cookieButtonTexts, cookieButtons});
  if (cookieButtons?.length) {
    cookieButtons.forEach((cookieButton) => {
      performClick(cookieButton);
    });
    declineCookieButtonPressed = true;
    
    try {
      await sendMessageDeclineCookieButtonPressed(declineCookieButtonPressed);
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

  await sendMessageInitStorage();
  
  window.addEventListener('load', async function () {
    logger.trace("clickCookieBannerWhenPageReady event load");
    await clickCookieBannerWhenNotTriggered();
  });
  
  setTimeout(async () => {
    logger.trace("clickCookieBannerWhenPageReady event delayed");
    await clickCookieBannerWhenNotTriggered();
  }, TIMEOUT_DELAYED_SEARCH);
}

function getAllCookieDeclineHTMLElements(querySelector) {
  const buttonsSingleLabeledButton = getCookieDeclineOrAcceptHTMLElementsSingleLabeledButton(querySelector);
  const buttonsInFlatMenu = getCookieDeclineHTMLElementsInFlatMenu(querySelector);
  // const buttonsInNestedMenu = getCookieDeclineHTMLElementsInNestedMenu(querySelector);
  
  // Deduplication
  return toDeduplicatedArray([...buttonsSingleLabeledButton, ...buttonsInFlatMenu]);
}

function getAllCookieDeclineButtons() {
  return getAllCookieDeclineHTMLElements('button, span, a');
}

clickCookieBannerWhenPageReady();