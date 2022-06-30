
function saveOptions(e) {
    browser.storage.sync.set({
        server: document.querySelector("#server").value
    });
    e.preventDefault();
}

function restoreOptions() {
    /*
    var storageItem = browser.storage.managed.get('server');
    storageItem.then((res) => {
        document.querySelector("#-colour").innerText = res.colour;
    });
    */

    var gettingItem = browser.storage.sync.get('server');
    gettingItem.then((res) => {
        document.querySelector("#server").value = res.server || 'localhost:8090';
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);