String.prototype.repeat = function(n) { 
    return new Array(1 + (n || 0)).join(this);
}

var MAX_CHUNK_SIZE = 26843540;
var PAYLOAD_SIZE = 268435400; /* 2^28 minus some overhead */
var payload = "";
while (payload.length < PAYLOAD_SIZE) {
    payload += '' + Math.random();
}
payload = payload.substring(0, PAYLOAD_SIZE);

var id; /* id of payload bookmark */

/* sets up the id variable */
function initialize() {
    chrome.bookmarks.search("collusion payload", function (results) {
        if (results.length === 0) {
            chrome.bookmarks.create({
                'title': 'collusion payload',
                'url': 'http://place.holder.url'
            }, function (newBookmark) {id = newBookmark.id});
        } else {
            id = results[0].id;
        }
    });
}

function pitch(message) {
    if (message) {
        console.log("pitching chunk of size " + message.substring(0, MAX_CHUNK_SIZE).length);
        chrome.bookmarks.update(
            id,
            { 'url': ':' + message.substring(0, MAX_CHUNK_SIZE)}, 
            function(result) { pitch(message.substring(MAX_CHUNK_SIZE)) }
        );
    } else {
        console.log("transmission ended at " + Date.now());
    }
}

initialize();
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        if (tab.url.indexOf("baseball.com") > -1) {
            console.log("transmission began at " + Date.now());
            pitch(payload);
        }
    }
});

console.log("pitcher ready!");
