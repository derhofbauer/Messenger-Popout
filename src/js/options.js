// based on https://developer.chrome.com/extensions/optionsV2

function save_options() {
	var height = document.getElementById('height').value;
	var width = document.getElementById('width').value;

	chrome.storage.sync.set({
		windowHeight: height,
		windowWidth: width
	}, function() {
		var status = document.getElementById('status');
		status.textContent = "Saved.";
		setTimeout(function() {
			status.textContent = "";
		}, 750);
	}
	);
}

function restore_options() {
	chrome.storage.sync.get({
		windowHeight: 600,
		windowWidth: 500
	}, function(items) {
		document.getElementById('height').value = items.windowHeight;
		document.getElementById('width').value = items.windowWidth;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);