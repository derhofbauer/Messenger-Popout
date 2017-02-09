var storedvalue = !((localStorage['options_pb']===undefined) || (localStorage['options_pb']=='NaN') || (localStorage['options_pb']=='false') || (localStorage['options_pb']==false));
if(!storedvalue) {
	var url = 'options.html';
	window.location = url;
}
else {
	openFBPopup();
}