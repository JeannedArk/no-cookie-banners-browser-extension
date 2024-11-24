// More sophisticated implementations:
// https://github.com/darkreader/darkreader/blob/main/src/utils/platform.ts
// Alternatively, could use navigator.userAgent API
function isPlatformChrome() {
    return typeof browser === "undefined";
}

const IS_CHROMIUM = isPlatformChrome();
const IS_FIREFOX = !IS_CHROMIUM;