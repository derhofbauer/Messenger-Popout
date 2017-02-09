function addListener(element, eventName, handler) {
  if (element.addEventListener) {
    element.addEventListener(eventName, handler, false);
  }
  else if (element.attachEvent) {
    element.attachEvent('on' + eventName, handler);
  }
  else {
    element['on' + eventName] = handler;
  }
}

function registerproversion() {
  // ok, this code is not so stealthy...
  // there's a lot of work behind this extension, so I hope you to be fair...
  // if not, enjoy anyway... and happy hacking!! ;-)
  // if you want, you can write me an email about this...
  var needle = 47390;
  var today = new Date();
  var m = today.getMonth()+1;
  var y = today.getFullYear();
  var r = needle+y*3+m^2*6;
  var v = document.getElementById('procode').value;
  if(v==r) {
      alert("Thanks for your support. It's really appreciated.");
      localStorage['isprouser'] = true;
      document.getElementById('proversion').style.display='none';
  }
  else {
    alert('Check your code or contact us at enrico.cambiaso[at]gmail.com');
  }
  // ok, this code is not good at all... but the purpose here is not to make a secure system...
}

function changeNSSetting() {
  var storedvalue = !(localStorage['options_ns']=='false' || localStorage['options_ns']==false);
  storedvalue = !storedvalue;
  localStorage['options_ns'] = storedvalue;
  alert('Sound notification is now '+(storedvalue ? 'enabled' : 'disabled')+'!');
  setNSSetting();
}

function changeDNSetting() {
  var storedvalue = !(localStorage['options_dn']=='false' || localStorage['options_dn']==false);
  storedvalue = !storedvalue;
  localStorage['options_dn'] = storedvalue;
  alert('Desktop notifications are now '+(storedvalue ? 'enabled' : 'disabled')+'!');
  setDNSetting();
}

var windowW_small = 325;
var windowW_small_Mac = 320;
var windowH_small = 600;
var windowW_big = 630;
var windowH_big = 700;
var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;
function changeWSSetting(size) {
  //var issmallstored = (localStorage['windowW']<400 && localStorage['windowH']==600);
  //var windowW = 400; var windowH = 600; if(issmallstored) { windowW = 600; windowH = 800; }
  var issmallstored = (localStorage['windowW']<400);
  var w_small = windowW_small;
  if(isMacLike) w_small = windowW_small_Mac;
  var windowW, windowH;
  if(size=='small') { windowW = w_small; windowH = windowH_small; }
  if(size=='large') { windowW = windowW_big; windowH = windowH_big; }
  if(size=='custom') {
    // asking widht
    var w = prompt("Please enter desired window width", localStorage['windowW']);
    if(w!=null) {
      w = Math.abs(w);
      if(w<100) w = windowW_small;
      if(w>4000) w = 4000;
      // asking height
      var h = prompt("Please enter desired window height", localStorage['windowH']);
      if(h!=null) {
        h = Math.abs(h);
        if(h<100) h = windowH_small;
        if(h>4000) h = 4000;
        // saving values
        windowW = w;
        windowH = h;
      }
    }
  }
  localStorage.setItem('windowW', windowW);
  localStorage.setItem('windowH', windowH);
  alert('Facebook Messenger window size is '+(!issmallstored ? 'small' : 'large')+'!');
  setWSSetting();
}

function changePBSetting() {
  var storedvalue = !((localStorage['options_pb']===undefined) || (localStorage['options_pb']=='NaN') || (localStorage['options_pb']=='false') || (localStorage['options_pb']==false));
  storedvalue = !storedvalue;
  localStorage['options_pb'] = storedvalue;
  alert('Pinned behavior is now '+(storedvalue ? 'enabled' : 'disabled')+'!');
  setNSSetting();
}

function changeCustomEnterBehaviorSetting() {
  var storedvalue = !(localStorage['customeventbehavior']=='false' || localStorage['customeventbehavior']==false);
  storedvalue = !storedvalue;
  localStorage['customeventbehavior'] = storedvalue;
  alert('Fast Messages Sending is now '+(storedvalue ? 'enabled' : 'disabled')+'!');
  setCustomEnterBehaviorSetting();
}

function setNSSetting() {
  var status = document.getElementById('nsstatus');
  var change = document.getElementById('nschange');
  var storedvalue = !(localStorage['options_ns']=='false' || localStorage['options_ns']==false);
  status.innerHTML = 'Notification sound is '+(storedvalue ? 'enabled' : 'disabled')+'!';
  change.innerHTML = '<a href="#" id="changenssetting">Click to '+(storedvalue ? 'disable' : 'enable')+' it</a>';
  addListener(document.getElementById('changenssetting'), 'click', function() { changeNSSetting(); return false; });
}

function setDNSetting() {
  var status = document.getElementById('dnstatus');
  var change = document.getElementById('dnchange');
  var storedvalue = !(localStorage['options_dn']=='false' || localStorage['options_dn']==false);
  status.innerHTML = 'Desktop notification are '+(storedvalue ? 'enabled' : 'disabled')+'!';
  change.innerHTML = '<a href="#" id="changednsetting">Click to '+(storedvalue ? 'disable' : 'enable')+' them</a>';
  addListener(document.getElementById('changednsetting'), 'click', function() { changeDNSetting(); return false; });
}

function setWSSetting() {
  var status = document.getElementById('wsstatus');
  var change = document.getElementById('wschange');
  var savedW = localStorage['windowW'];
  var savedH = localStorage['windowH'];
  status.innerHTML = 'Facebook Messenger window size is '+savedW+'x'+savedH;
  change.innerHTML = 'Set to <a href="#" id="changewssettingsmall">SMALL</a> - <a href="#" id="changewssettinglarge">LARGE</a> - <a href="#" id="changewssettingcustom">CUSTOM</a>';
  addListener(document.getElementById('changewssettingsmall'), 'click', function() { changeWSSetting('small'); return false; });
  addListener(document.getElementById('changewssettinglarge'), 'click', function() { changeWSSetting('large'); return false; });
  addListener(document.getElementById('changewssettingcustom'), 'click', function() { changeWSSetting('custom'); return false; });
  ////var issmallstored = (localStorage['windowW']==400 && localStorage['windowH']==600);
  //var issmallstored = (localStorage['windowW']<400);
  //status.innerHTML = 'Facebook Messenger window size is '+(issmallstored ? 'small' : 'large')+'!';
  //change.innerHTML = '<a href="#" id="changewssetting">Click to set to '+(issmallstored ? 'large' : 'small')+'</a>';
  //addListener(document.getElementById('changewssetting'), 'click', function() { changeWSSetting(); return false; });
}

function setCustomEnterBehaviorSetting() {
  var divid = document.getElementById('customenterbehavior');
  var storedvalue = (localStorage['customeventbehavior']=='true' || localStorage['customeventbehavior']==true);
  divid.innerHTML = 'Fast Messages Sending with Enter key is '+(storedvalue ? 'enabled' : 'disabled')+'!';
  divid.innerHTML+= '<br/><a href="#" id="changecustomenterbehavior">Click to '+(storedvalue ? 'disable' : 'enable')+' it</a>';
  addListener(document.getElementById('changecustomenterbehavior'), 'click', function() { changeCustomEnterBehaviorSetting(); return false; });
}

function setPBSetting() {
  var status = document.getElementById('pbstatus');
  var change = document.getElementById('pbchange');
  var storedvalue = !((localStorage['options_pb']===undefined) || (localStorage['options_pb']=='NaN') || (localStorage['options_pb']=='false') || (localStorage['options_pb']==false));
  status.innerHTML = 'Pinned behavior is '+(storedvalue ? 'enabled' : 'disabled')+'!<br/>Enabled it if you pinned Facebook Extension to Windows taskbar<br/>';
  change.innerHTML = '<a href="#" id="changepbsetting">Click to '+(storedvalue ? 'disable' : 'enable')+' them</a>';
  addListener(document.getElementById('changepbsetting'), 'click', function() { changePBSetting(); return false; });
}

function checkProVersion() {
  var v = localStorage['isprouser'];
  if(v==undefined || v!='true') {
    document.getElementById('proversion').style.display='block';
    addListener(document.getElementById('registerproversion'), 'click', function() { registerproversion(); return false; });
  }
}

function showAppVersion() {
  var manifest = chrome.runtime.getManifest();
  var version = manifest.version;
  document.getElementById('appversion').innerHTML='v. '+version;
}

setTimeout(function() {
  showAppVersion();
  setNSSetting();
  setDNSetting();
  setWSSetting();
  setCustomEnterBehaviorSetting();
  setPBSetting();
  checkProVersion();
}, 100);
