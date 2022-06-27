"use strict";

function onError(error) {
    console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
    console.log("Tabs: ", tabs);
    for (let tab of tabs) {
        console.log("Tab", tab);
        addTabToIndex(tab);
    }
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendMessageToTabs).catch(onError);
});


function addTabToIndex(tab) {
    const url = "http://localhost:8090/Crawler_p.html";

    const data = {
        crawlingMode: "url",
        crawlingURL: tab.url,
        bookmarkTitle: tab.title,
        sitemapURL: "",
        crawlingDepth: 0,
        range: "domain",
        deleteold: "on",
        mustnotmatch: "",
        crawlingDomFilterCheck: "off",
        crawlingDomMaxCheck: "on",
        crawlingDomMaxPages: 1,
        collection: "user",
        directDocByURL: "off",
        recrawl: "reload",
        reloadIfOlderNumber: 3,
        reloadIfOlderUnit: "day",
        cleanSearchCache: "off",
        deleteold: "on",
        storeHTCache: "on",
        cachePolicy: "iffresh",
        crawlingQ: "on",
        followFrames: "on",
        obeyHtmlRobotsNoindex: "on",
        indexText: "on",
        indexMedia: "on",
        intention: "",
        timezoneOffset: new Date().getTimezoneOffset(),
        crawlingstart: "Start New Crawl",
    };

    let formdata = new FormData();
    for (let key in data) {
        formdata.append(key, data[key]);
    }

    fetch(url, {
        method: "POST",
        body: formdata,
        mode: "cors",
    }).then(res => {
        console.log("Index request submitted", res);
    }).catch(e => {
        console.error("Failed to index page", e);
        console.log(e);
    })
}
