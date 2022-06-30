
function addToIndex(depth) {
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then((tabs) => {
        for (let tab of tabs) {
            console.log("Tab", tab);
            addTabToIndex(tab, depth);
        }
    }).catch(onError);
}

function addTabToIndex(tab, depth) {
    var gettingItem = browser.storage.local.get('server');
    const params = {
        crawlingMode: "url",
        crawlingURL: tab.url,
        bookmarkTitle: tab.title,
        sitemapURL: "",
        crawlingDepth: depth,
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
    gettingItem.then(options => {
        let url = `http://${options.server || 'localhost:8090'}/Crawler_p.html?` + new URLSearchParams(params);
        let notification = document.querySelector("#notification");
        let alert = document.querySelector("#alert");

        fetch(url, {
            method: "GET",
            mode: "cors",
        })
            .then(res => {
                document.querySelectorAll(".button-38").forEach((btn) => {
                    btn.style.display = "none";
                });
                notification.innerText = "Page has been added to YaCy Crawler."
                alert.style.display = "flex";
                if (res.status != 200) {
                    notification.innerText += " Status: " + res.status;
                }
            })
            .catch(e => {
                console.error("Failed to index page", e);
                notification.innerText = e.toString();
                alert.style.display = "flex";
            });
    });
}

function onError(error) {
    console.error(`Error: ${error}`);
}

document.querySelector("#level-0-btn").addEventListener('click', () => addToIndex(0));
document.querySelector("#level-1-btn").addEventListener('click', () => addToIndex(1));