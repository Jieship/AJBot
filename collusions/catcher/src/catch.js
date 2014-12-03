chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
    if (bookmark.title == "collusion payload") {
        console.log("caught " + bookmark.index);
    }
});

console.log("catcher ready!");
