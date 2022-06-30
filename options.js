
function saveOptions(e) {
    browser.storage.local.set({
        server: document.querySelector("#server").value
    });
    e.preventDefault();
}

function restoreOptions() {
    var gettingItem = browser.storage.local.get('server');
    gettingItem.then((res) => {
        document.querySelector("#server").value = res.server || 'localhost:8090';
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);