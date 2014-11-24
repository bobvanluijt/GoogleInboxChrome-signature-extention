var imInMd5 = '005111c7f697b47d29d20371dfc80574';
var signature;
var signatureHtml;

chrome.storage.sync.get("inboxSignature", function (obj) {
	signature = obj['inboxSignature'];
	signatureHtml = '<div class="'+imInMd5+'">'+signature+'</div>';
});

function showTheBigWindow(){
	var iDiv = document.createElement('div');
	iDiv.id = 'createSignatureBlack';
	document.getElementsByTagName('body')[0].appendChild(iDiv);
	
	document.getElementById('createSignatureBlack').innerHTML = '<div id="createSignatureBlack" style="background-color: rgba(10,10,10,.6); bottom: 0; left: 0; position: fixed; right: 0; top: 0; z-index: 50; align-items: center; -webkit-align-items: center; display: -webkit-flex; display: flex; visibility: visible;"><div class="pA" jstcache="0" style="background-color: #fff;border-radius: 2px;box-shadow: 0 0 14px rgba(0,0,0,.24),0 14px 28px rgba(0,0,0,.48);height: 75%;margin: 0 auto;min-height: 260px;overflow: hidden;width: 600px;-webkit-flex-direction: column;flex-direction: column;display: -webkit-flex;display: flex;"><div style="border-bottom: 1px solid #e5e5e5;color: #212121;font-size: 16px;height: 60px;line-height: 60px;padding: 0 24px;text-align: left;">Add a HTML signature</div><div><textarea id="createSignatureText" style="width: 96%;height: 160px;margin: 2%; z-index:999999">'+signature+'</textarea><button id="closeTheBigWindow" style="width: 96%;height: 48px;margin: 2%;">Close</button></div></div></div>';
	
	document.getElementById('closeTheBigWindow').addEventListener("click", function(){
		var x3 = document.getElementById('createSignatureBlack').remove();
	
		document.getElementById('createSignature').addEventListener("click", function(){
			showTheBigWindow();
		});
	});
	
	document.getElementById('createSignatureText').addEventListener("keyup", function(){
		var md5 = document.getElementsByClassName(imInMd5);
		var md5i = 0;
		chrome.storage.sync.set({'inboxSignature': document.getElementById('createSignatureText').value});
		signature = document.getElementById('createSignatureText').value
		signatureHtml = '<div class="'+imInMd5+'">'+signature+'</div>';
		while(md5i<md5.length){
			md5[md5i].innerHTML = md5[md5i].innerHTML+'<p>'+signatureHtml+'</p>';
			i++;
		}
	});
}

function addTheSignature(){
	var x = document.getElementsByClassName("eq");
	var i = 0;
	while(i<x.length){
		if(x[i].innerHTML.indexOf(imInMd5)=='-1'){
			x[i].innerHTML = x[i].innerHTML+'<p>'+signatureHtml+'</p>';
		}
		i++;
	}
}

//var gH = document.getElementsByClassName("gH");
//var ghListener = gH[0];
//ghListener.addEventListener("click", function(){
setInterval(function(){
	addTheSignature();
}, 10);
//});




var x2 = document.getElementsByClassName("oCKk2");
var parentDiv = x2[0].parentNode;
var parentDivContent = parentDiv.innerHTML;
	parentDiv.innerHTML = '<li class="eR"><div class="fS o1 fn" jstcache="0"></div><div class="mD" id="createSignature" jstcache="0">Signature</div></li>'+parentDivContent;
document.getElementById('createSignature').addEventListener("click", function(){
	showTheBigWindow();
});