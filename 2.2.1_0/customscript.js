function isRightURL() {
	var url = "://m.facebook.com/messages";
	var s = document.URL;
	return (s.indexOf(url) != -1);
}

function showTitle() {
	// moving current elements
	document.getElementById("header").childNodes[1].style.textAlign="right";
	document.getElementById("header").childNodes[1].style.minWidth="375px";
	// adding title
	var objTo = document.body;
	var divtest = document.createElement("div");
	divtest.id = "apptitle";
	divtest.innerHTML = "<a href=\"https://m.facebook.com/messages/\">Facebook Messenger</a>";
	objTo.appendChild(divtest);
}

function insertStats() {
	/*
	var objTo = document.body;
	var divtest = document.createElement("div");
	divtest.id = "customstats";
	//divtest.innerHTML = "<iframe src=\"https://dl.dropboxusercontent.com/u/280149/development/fb.html\"></iframe>";
	//divtest.innerHTML = "<iframe src=\"http://www.italiawebcam.org/dev/fbmessenger.html\"></iframe>";
	//divtest.innerHTML = "<iframe src=\"https://devtest.auino.com/fbmessenger.html\"></iframe>";

	objTo.appendChild(divtest);
	*/
	/*
	var filename = 'ga.js';
	var fileref=document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", filename);
	console.log('Inserted! '+filename+' '+fileref);
	if(typeof fileref!="undefined") document.getElementsByTagName("head")[0].appendChild(fileref);
	*/
}

//insertStats();

console.log(isRightURL());
if(isRightURL()) {
	document.getElementById("mJewelNav").style.display="none";
	document.getElementById("mJewelNav").childNodes[0].style.display="none"; // hiding news
	document.getElementById("mJewelNav").childNodes[1].style.display="none"; // hiding friendship requests
	var messagesicon = document.getElementById("mJewelNav").childNodes[2]; // messages
	document.getElementById("mJewelNav").childNodes[3].style.display="none"; // hiding notifications
	document.getElementById("mJewelNav").childNodes[4].style.display="none"; // hiding menu

	try {
		document.getElementById("mJewelNav").childNodes[3].style.display="none"; // last "unknown" icon
	} catch(e) { }
	
	messagesicon.style.display="block";
	messagesicon.style.margin="0 auto";
	messagesicon.style.width="43px";
	
	document.getElementById("mJewelNav").style.display="block";
	
	manageEnterKeyMessagePress();
	//console.log(document.forms);
}

function manageEnterKeyMessagePress() {
	//var shouldEditBehavior = (localStorage['customeventbehavior']=='true' || localStorage['customenterbehavior']==true);
	//console.log(window.localStorage); //.getItem('customeventbehavior'));
	//if(!shouldEditBehavior) return;

	try {
		var t = document.body.innerHTML;
		t = (''+t).substr(t.indexOf('id="m-messages-touch-composer-send-button"')+1);
		t = (''+t).substr(t.indexOf('textarea class="')+1);
		t = (''+t).substr(t.indexOf('id=')+4);
		t = (''+t).substr(0, t.indexOf('"'));
		var inputid = t;
		manageEnterKeyEventWrapper(inputid, 'm-messages-touch-composer-send-button');
	} catch(e) { }

	try {
		var t = document.body.innerHTML;
		t = (''+t).substr(t.indexOf('id="composerInput"')+1);
		t = (''+t).substr(t.indexOf('type="submit"'));
		t = (''+t).substr(t.indexOf('id=')+4);
		t = (''+t).substr(0, t.indexOf('"'));
		var buttonid = t;
		manageEnterKeyEventWrapper('composerInput', buttonid);
	} catch(e) { alert(e); }

	setTimeout(function() {
		manageEnterKeyMessagePress();
	}, 100);
}
function manageEnterKeyEventWrapper(inputid, buttonid) {
	var v = document.getElementById(inputid);
	if(v!=null) {
		v.onkeypress = function(e) {
			if(e.keyCode == 13) {
				var b = document.getElementById(buttonid);
				b.click();
				return false;
			}
		};
		//console.log(v);
	}
}
