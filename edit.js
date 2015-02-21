$(document).ready(function() {
	chrome.storage.sync.get(null, function(items) {
		var signature = items["inboxSignature("+location.hash.substr(1)+")"];
		$('#editor').val( signature );
		tinymce.init({
					plugins: [
		        "advlist autolink lists link image charmap print preview anchor",
		        "searchreplace visualblocks code fullscreen",
		        "insertdatetime media table contextmenu paste"
		    ],
		    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
		    selector: "textarea"
		 });
		$('.saveSignature').click(function(){
			var setSignature = {};
			setSignature["inboxSignature("+location.hash.substr(1)+")"] = tinyMCE.activeEditor.getContent({format : 'raw'});
			chrome.storage.sync.set(setSignature, function(){
				location.assign("popup.html");
			});
		});
	});
});