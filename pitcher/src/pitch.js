function pitch() {
    console.log("pitcher started pitching");
    for (var i=0; i < 10; i++) {
        chrome.bookmarks.create({
            'title': 'collusion payload',
            'index': i
        });
    }
    console.log("pitcher finished pitching");
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        if (tab.url.indexOf("baseball.com") > -1) {
            pitch();
        }
    }
});

console.log("pitcher ready!");
