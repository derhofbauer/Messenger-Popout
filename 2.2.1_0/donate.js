function showRightMessage() {
  var mustshowpromotion = false;
  //if(localStorage['facebookmobileview']=='NaN') mustshowpromotion = true;
  //if(localStorage['facebookmobileview']!='true') mustshowpromotion = true;
  //mustshowpromotion = true; // TEMPORARY DEBUG
  if(mustshowpromotion) {
  	var today = new Date();
	  var dd = today.getDate();
	  if((dd%2)==1) { // show FB Mobile View message
 	    document.getElementById('realcontent').style.display='none';
	    document.getElementById('promotion').style.display='block';
	    //localStorage.setItem('facebookmobileview', true);
    }
  }
}

setTimeout(function() { showRightMessage(); }, 100);