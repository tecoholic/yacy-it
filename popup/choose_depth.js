
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
    let params = {
        url: tab.url,
        title: tab.title,
        crawlingDepth: depth || 0,
        localIndexing: "on",
        xdstopw: "on",
        storeHTCache: "on",
        crawlingQ: "off"
    }
    let url = "http://localhost:8090/QuickCrawlLink_p.xml?" + new URLSearchParams(params);
    let notification = document.querySelector("#notification");
    let alert = document.querySelector("#alert");

    fetch(url, {
        method: "GET",
        // body: formdata,
        mode: "cors",
    })
        .then(res => res.text())
        .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
        .then(xmldom => {
            document.querySelectorAll(".button-38").forEach((btn) => {
                btn.style.display = "none";
            });
            notification.innerText = xmldom.querySelector("status").innerHTML.trim();
            alert.style.display = "flex";
        })
        .catch(e => {
            console.error("Failed to index page", e);
            notification.innerText = e.toString();
            alert.style.display = "flex";
        });
}

function onError(error) {
    console.error(`Error: ${error}`);
}

document.querySelector("#level-0-btn").addEventListener('click', () => addToIndex(0));
document.querySelector("#level-1-btn").addEventListener('click', () => addToIndex(1));