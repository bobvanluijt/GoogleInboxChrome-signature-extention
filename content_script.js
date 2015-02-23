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


var imInMd5 = '005111c7f697b47d29d20371dfc80574';
var lastUsedEmail;									

setInterval(function(){

	if(document.getElementsByClassName("em")[0]) {

		if(lastUsedEmail!=document.getElementsByClassName("o8")[0].innerHTML){
			var elementsToRem = document.getElementsByClassName(imInMd5);
		    while(elementsToRem.length > 0){
		        elementsToRem[0].parentNode.removeChild(elementsToRem[0]);
		    }
		}
		lastUsedEmail = document.getElementsByClassName("o8")[0].innerHTML;

		if(!document.getElementsByClassName(imInMd5)[0]) {
		    chrome.storage.sync.get(null, function(items) {
		    	var allKeys = Object.keys(items);
		    	if(document.getElementsByClassName("o8")[0]){
		    		var sign = 'inboxSignature('+document.getElementsByClassName("o8")[0].innerHTML+')';
		    	} else {
		    		var sign = 0;
		    	}
				allKeys.forEach(function(entry) {
				    if(sign==entry){
				    	var replacerSign = items[sign];
				    	var currentInnerHTML = document.getElementsByClassName("em")[0].innerHTML;
				    	if(document.getElementById(imInMd5)){
					    	document.getElementById(imInMd5).remove();
					    }
				    	document.getElementsByClassName("em")[0].innerHTML = '<br><div id="'+imInMd5+'" class="'+imInMd5+'">'+replacerSign+'</div>'+currentInnerHTML;
				    }
				});
			});
		}
	}

	if(document.getElementsByClassName("aS")[0]) {
		if(!document.getElementsByClassName(imInMd5)[0]) {
		    chrome.storage.sync.get(null, function(items) {
				var sign = 'inboxSignature('+document.getElementsByClassName("nJ")[0].elements["email"].value+')';
				var element = document.getElementsByClassName("nJ")[0].getAttribute("email");
				var replacerSign = items[sign];
				var currentInnerHTML_after = document.getElementsByClassName("aS")[0].innerHTML;
			    document.getElementsByClassName("aS")[0].innerHTML = '<br><div id="'+imInMd5+'" class="'+imInMd5+'">'+replacerSign+'</div>'+currentInnerHTML_after;
			});
		}
	}

}, 500);