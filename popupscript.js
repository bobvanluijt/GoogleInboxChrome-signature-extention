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
	
var currentVersion = 71; //write version without dots
var currentVersionReadable = '0.7.1';
var imInMd5 = '005111c7f697b47d29d20371dfc80574';
var signature;
var signatureHtml;
var startRunning = false;

function checkEmail(emailAddress) {
  var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
  var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
  var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
  var sQuotedPair = '\\x5c[\\x00-\\x7f]';
  var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
  var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
  var sDomain_ref = sAtom;
  var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
  var sWord = '(' + sAtom + '|' + sQuotedString + ')';
  var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
  var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
  var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
  var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

  var reValidEmail = new RegExp(sValidEmail);

  if (reValidEmail.test(emailAddress)) {
    return true;
  }

  return false;
}

$(document).ready(function() {

	$('.newSignature').click(function(){
		$('.newSignature').fadeOut("fast");
		$('body').prepend('<div class="addBox"><input type="text" name="newEmail" id="newEmail" placeholder="email"><div class="button edit" id="addNewEmail" style="background-color:#DAA520; width:70px; text-align:center">add</div></div>');
		$('#addNewEmail').click(function(){
			if(checkEmail($('#newEmail').val())===false){
				$('.addBox').prepend('<div class="error" style="color:red">That seems to be an invalid email...</div>');
				$('#newEmail').val('');
			} else {
				var setSignature = {};
				    signature = 'This is the Kubrickolo.gy (<a href="https://twitter.com/kubrickology" target="_blank">@kubrickology</a>@kubrickology</a>) <strong>html</strong> Google Inbox signature';
				    setSignature['inboxSignature(' + $('#newEmail').val() + ')'] = signature;
					chrome.storage.sync.set(setSignature, function(){
						location.reload();
					});
			}
		})
	});

	chrome.storage.sync.get(null, function(items) {
	    var allKeys = Object.keys(items);
	    $.each(allKeys, function( index, value ) {
	    	//console.log(index+' '+value);
	    	var showVal = value.replace("inboxSignature(", "").replace(")", "");
	    	if(checkEmail(showVal)===true){
	    		$('h1').after('<div class="button add" id="'+showVal+'">'+showVal+'</div><div class="button edit" id="'+showVal+'" style="width:70px; text-align:center">edit</div><div class="button remove" id="'+showVal+'" style="width:70px; text-align:center">remove</div>');
	    	}
	    	$('.edit').click(function(){
	    		location.assign("edit.html#"+ $(this).attr('id') );
	    	});
	    	$('.remove').click(function(){
	    		var toBeRemoved = "inboxSignature("+$(this).attr('id')+")";
	    		chrome.storage.sync.remove(toBeRemoved, function(Items) {
	    			location.assign("popup.html");
	    		});
	    	})
		});
	});

	/*
	 * Listen for an editor
	 */
	chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
	   function(tab){
	      	chrome.tabs.executeScript(tab.id,{
	      		//code: "$('body').prepend('HALLO');"
	  		});
	   }
	);
	
});