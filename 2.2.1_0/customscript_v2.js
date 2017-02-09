var windowW_small = 325;
var windowW_small_Mac = 320;

var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;

var iscustomized = false;
var backinserted = false;

function appendjquery() {
	var url = 'https://code.jquery.com/jquery-2.1.3.min.js';
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	document.body.appendChild(script);
	script.onreadystatechange = function () {
		if (this.readyState == 'complete') configurepage();
	}
	script.onload = configurepage;
}

function configure() {
	//appendjquery();
	hidemessagebox();
	configurepage();
	iscustomized = true;
}

function configurepage() {
	setcontentwidth();
	configurelistclickevents();
	interceptescbuttonpress();
	setnewmessageaction();
}

function setnewmessageaction() {
	document.getElementsByClassName("_4bl8")[0].onclick = showmessagebox;
}

function interceptescbuttonpress() {
	document.body.onkeydown = function(e) {
		if (e.keyCode == 27) { // esc
			hidemessagebox();
		}
	}
}

function setcontentwidth() {
	var w = windowW_small;
	if(isMacLike) w = windowW_small_Mac;
	document.getElementsByClassName("_4sp8")[0].style.minWidth=""+w+"px";
	document.getElementsByClassName("_4sp8")[0].style.maxWidth=""+w+"px";
	document.getElementsByClassName("_4sp8")[0].style.width=""+w+"px";
}

function configurelistclickevents() {
	var links = document.getElementsByClassName("_1ht1");
	for(var i=0; i<links.length; i++) {
		var el = links[i];
		el.onclick = showmessagebox;
	}
}

function showmessagebox() {
	var left = document.getElementsByClassName("_1enh")[0];
	left.style.display = 'none';
	var right = document.getElementsByClassName("_4bl9")[1];
	right.style.display = 'block';
	document.getElementsByClassName("_5743")[0].onclick = hidemessagebox;
	if(!backinserted) {
		document.getElementsByClassName("_5743")[0].innerHTML = '<span style="color:#0077e5;font-weight:bold;cursor:pointer;">&lt;&nbsp;</span>'+document.getElementsByClassName("_5743")[0].innerHTML
		backinserted = true;
	}
	document.getElementsByClassName("_5743")[0].style.cursor = 'pointer';
}

function hidemessagebox() {
	var left = document.getElementsByClassName("_1enh")[0];
	left.style.display = 'block';
	var right = document.getElementsByClassName("_4bl9")[1];
	right.style.display = 'none';
}

document.body.onresize = function() {
	console.log("resize: "+window.innerWidth);
	if((window.innerWidth >= 400 && iscustomized) || (window.innerWidth < 400 && !iscustomized)) location.reload();
}

if(window.innerWidth < 400) document.onreadystatechange = configure;