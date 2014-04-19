chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	// Check that we're in a set on soundcloud
	var l = document.createElement("a");
    l.href = tab.url;
    if (l.hostname == "soundcloud.com" && l.pathname.indexOf("/sets/") != -1)
    {
		chrome.pageAction.show(tabId);
    }
});

chrome.pageAction.onClicked.addListener(function(tab)
{
	var targetUrl = "http://shufflethatshit.com/?playlist="+btoa(tab.url)+"&encoding=base64";
	//window.location.href = ;
	chrome.tabs.update(tab.id, {url: targetUrl});
});