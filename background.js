chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	var supportedPageTypes = ['user', 'playlist', 'group', 'track'];

	// Check that we're in a set on soundcloud
	var l = document.createElement("a");
    l.href = tab.url;
    if (l.hostname == "soundcloud.com")
    {
		var resolve = 'http://api.soundcloud.com/resolve.json?url=' + tab.url + '&client_id=5ff9f3fc8b4a91f15cb63533c8595f45';
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (this.readyState === 4 && this.responseText) {
				var response = JSON.parse(this.responseText);
				if (response.kind && supportedPageTypes.indexOf(response.kind) != -1) {
					chrome.pageAction.show(tabId);
				}
			}
		};
		request.open('get', resolve, true);
		request.send();
    }
});

chrome.pageAction.onClicked.addListener(function(tab)
{
	var targetUrl = "http://shufflethatshit.com/?permalink="+btoa(tab.url);
	chrome.tabs.update(tab.id, {url: targetUrl});
});