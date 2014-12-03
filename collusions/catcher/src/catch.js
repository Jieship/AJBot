chrome.bookmarks.onChanged.addListener(function(id, changeInfo) {
    chrome.bookmarks.get(id, function(results) {
        var bookmark = results[0];
        if (bookmark.title === "collusion payload") {
            console.log("caught chunk of size " + (bookmark.url.length - 1));
        }
    });
});

console.log("catcher ready!");
