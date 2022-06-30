browser.runtime.onInstalled.addEventListener(function (details) {
    if (details.reason === "install") {
        browser.runtime.openOptionsPage();
    }
});