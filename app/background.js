/*_          _          _      _         _                   
 | |        | |        (_)    | |       | |                  
 | | ___   _| |__  _ __ _  ___| | _____ | | ___   __ _ _   _ 
 | |/ / | | | '_ \| '__| |/ __| |/ / _ \| |/ _ \ / _` | | | |
 |   <| |_| | |_) | |  | | (__|   < (_) | | (_) | (_| | |_| |
 |_|\_\\__,_|_.__/|_|  |_|\___|_|\_\___/|_|\___/ \__, |\__, |
                                                  __/ | __/ |
                                                 |___/ |___/ 
	Google chrome extension by Bob van Luijt
	-- This extension adds a signature to Google Inbox --
	-- issues? Github! https://github.com/kubrickology/GoogleInboxChrome-signature-extention/issues -- */
	
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
	  //chrome.tabs.executeScript(null, { file: "jquery2.js" }, function() {
		chrome.tabs.executeScript(null, {file: "content_script.js"});
	  //});
  }
})