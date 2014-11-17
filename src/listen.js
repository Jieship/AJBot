chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url.indexOf("amazon.com") > -1) {
        var updateParam = new Object();
        updateParam.url = "http://ebay.com";
        chrome.tabs.update(tabId, updateParam);
    }
});
