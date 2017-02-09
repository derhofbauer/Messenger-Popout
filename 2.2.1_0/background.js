var sleepTimeout = 60;

var notificationTimeout = 5000;

/* popup.js inclusion start */

/* if changed, change popup.js too */

var currentVersion = 8; // changelog

var windowW_small = 325;
var windowW_small_Mac = 320;
var windowH_small = 600;
var windowW_big = 630;
var windowH_big = 700;

var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;

//var URL_MAIN = 'http://m.facebook.com/messages';
var URL_MAIN = 'https://www.messenger.com/login';
// var URL_MAIN = 'http://www.italiawebcam.org/dev/messenger/';

function mustSkipDonate() {
  return true
  var limit = 10;
  try {
    if(localStorage['skipcount']=='NaN') localStorage.setItem('skipcount', 1);
    var v = eval('('+localStorage['skipcount']+')');
    if(v==null) { localStorage.setItem('skipcount', ''+1); v = 1; }
    if(localStorage['skipcount']=='NaN');
    if(v >= limit) {
      localStorage.setItem('skipcount', ''+1);
      return false;
    }
    v++;
    localStorage.setItem('skipcount', ''+v);
    return true;
  }
  catch(e) {
    localStorage.setItem('skipcount', ''+1);
    return false;
  }
  return false;
}

function openFBPopup() {
  try {
    chrome.windows.remove(eval('('+localStorage['id']+')'), function() { });
  }
  catch(e) { }

  chrome.windows.getCurrent(function(w) {
    var url = 'changelog.html';
    if(localStorage['changelog']!=currentVersion) {
      localStorage['changelog'] = currentVersion;
    }
    else {
      url = 'donate.html';
      //console.log(eval('('+localStorage['isprouser']+')'));
      var skipDonate = mustSkipDonate();
      if ((skipDonate) || (eval('('+localStorage['isprouser']+')') == true))
        url = URL_MAIN;
        //url = 'redirect.html';
    }

    var windowW = windowW_big; //400;
    // var windowW = windowW_small; //630;
    // if(isMacLike) windowW = windowW_small_Mac;
    if(isNaN(localStorage['windowW']) || localStorage['windowW']=='NaN' || !parseInt(localStorage['windowW'])>=windowW)
      localStorage.setItem('windowW', windowW);
    else
      windowW = parseInt(localStorage['windowW']);
    var windowH = windowH_big; //600;
    // var windowH = windowH_small;
    if(isNaN(localStorage['windowH']) || localStorage['windowH']=='NaN' || !parseInt(localStorage['windowH'])>=windowH)
      localStorage.setItem('windowH', windowH);
    else
      windowH = parseInt(localStorage['windowH']);

    /*
    windowW = windowW_small; //630;
    if(isMacLike) windowW = windowW_small_Mac;
    windowH = windowH_small; //700;
    */
    
    var x = chrome.windows.create({'url': url, 'type': 'panel', 'focused': true,
      'width': windowW, 'height': windowH, 'top': (w.height-windowH), 'left': (w.width-windowW)},
      function(win) {
        localStorage['id'] = win.id;
      }
    );
  });
}

/* popup.js inclusion end */

function load() {
  chrome.browserAction.onClicked.addListener(function(tab) {
    openFBPopup();
  });
  checkNotifications();
}

// Thanks to: http://goo.gl/NoZ9yI
function checkNotifications() {
  var xhr=new XMLHttpRequest();
  xhr.open('GET','https://www.facebook.com/home.php',true);
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
      var xmlDoc=xhr.responseText;

      if(xmlDoc.indexOf('notificationsCountValue') > 0){
        loc=xmlDoc.indexOf('messagesCountValue');
        if(loc>0){
          var myString=xmlDoc.substr(loc, 80);
          var c = parseInt(myString.substring(myString.indexOf('>')+1,myString.indexOf('<')));
          updateIcon(c);
        }
      }
    }
    else return;
  }
  xhr.send(null);
  //window.clearTimeout(timerVar);
  //timerVar=window.setTimeout(loadData,timerDelay);
  setTimeout(function() {
    checkNotifications();
  }, sleepTimeout*1000);
}

function autoclosenotification(n) {
  try {
    setTimeout(function() { n.close(); }, notificationTimeout);
  }
  catch(e) { }
}

function playAudioNotification() {
  if(localStorage['options_ns']!='false'&&localStorage['options_ns']!=false) {
    var notificationSound = new Audio('sound/facebooknotification.mp3');
    notificationSound.play();
  }
}

function showDesktopNotification(n) {
  var havePermission = false;
  var notification;
  if(window.webkitNotifications) notification = window.webkitNotifications;
  if(chrome.notifications) notification = chrome.notifications;
  
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    //var notification = new Notification("Hi there!");
    havePermission = true;
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Whatever the user answers, we make sure we store the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }
      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var message = "Facebook Messenger notifications are tuned on";
        console.log(message);
        //var notification = new Notification(message);
      }
    });
  }

  //havePermission = notification.checkPermission();
  if (havePermission) { // == 0) { // 0 is PERMISSION_ALLOWED
    if(localStorage['options_dn']!='false'&&localStorage['options_dn']!=false) {
      var instance = new Notification(
        'Facebook Messenger', {
          body: 'You have '+n+' unread Facebook messages',
          icon: './img/icon_128.png'
        }
      );

      instance.onclick = function () { 
        //window.open("https://www.facebook.com/messages/");
        openFBPopup();
        instance.close();
      };
      instance.onerror = function () { /* Something to do */};
      instance.onshow = function () { /* Something to do */ };
      instance.onclose = function () { /* Something to do */ };

      autoclosenotification(instance);

      /*
      var notification = notification.createNotification(
        './img/icon_128.png',
        'Facebook Messenger',
        'You have '+n+' unread Facebook messages'
      );

      notification.onclick = function () {
        //window.open("https://www.facebook.com/messages/");
        openFBPopup();
        notification.close();
      }
      notification.show();
      autoclosenotification(notification);
      */
    }
    playAudioNotification();
  //} else {
  //    notification.requestPermission();
  }
}

function updateIcon(n) {
  var t;
  if(n<=0) t = '';
  else if(n>10) t = '10+';
    else t = ''+n;
  chrome.browserAction.setBadgeText({text: t}); 
  chrome.storage.sync.set({'fbmsgcounter': n}, function() { /* notify that we saved, if needed */ });
}
chrome.browserAction.setBadgeText({text: ''});

function areDesktopNotificationsEnabled() {
  var v = localStorage['options_dn'];
  if(v==undefined || v==true || v=='true') return true;
  return false;
}

if(areDesktopNotificationsEnabled()) {
  // counter value listener
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
      var storageChange = changes[key];
      if(key=='fbmsgcounter') {
        var oldvalue = storageChange.oldValue;
        var newvalue = storageChange.newValue;
        if(newvalue>oldvalue) showDesktopNotification(newvalue);
      }
      console.log('Storage key "%s" in namespace "%s" changed. ' + 'Old value was "%s", new value is "%s".', key, namespace, storageChange.oldValue, storageChange.newValue);
    }
  });
}

load();
