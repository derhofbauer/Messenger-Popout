/* if changed, change background.js inclusion too */

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

    //var windowW = windowW_big; //400;
    var windowW = windowW_small; //630;
    if(isMacLike) windowW = windowW_small_Mac;
    if(isNaN(localStorage['windowW']) || localStorage['windowW']=='NaN' || !parseInt(localStorage['windowW'])>=windowW)
      localStorage.setItem('windowW', windowW);
    else
      windowW = parseInt(localStorage['windowW']);
    //var windowH = windowH_big; //600;
    var windowH = windowH_small;
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
