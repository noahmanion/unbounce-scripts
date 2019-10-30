/****************************************************
* This script uses Ouibounce to show an exit intent modal
* on desktop and shows the modal after 25 sec on mobile.
* it will not show the modal if the user has submitted 
* the form in the last 60 minutes. It also sets a bunch
* of tracking codes. 
*
****************************************************/

<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/ouibounce/0.0.12/ouibounce.min.js"></script>-->
<script>
var minutes = 60;


function setCookie(co, cvalue, mins) {
	var d = new Date();
	d.setTime(d.getTime() + (mins * 60 * 1000));
	//set expiration
	expires ="; expires="+d.toGMTString();
	document.cookie = co+"="+cvalue+expires+"; path=/";
	console.log("setCookie function fired");
}


function yourSubmitFunction(e, $) {
  e.preventDefault();
  try {
    //ADD CUSTOM CODE HERE
    console.log('custom firing code here');
    setCookie("convert", true, minutes);
    console.log(document.cookie);
  }
  catch(err) {
    //code to handle errors. console.log is just an example
    console.log(err);
  } 
  finally {
    // This submits the form. If your code is asynchronous, add to callback instead
    lp.jQuery('.lp-pom-form form').submit();
  }
}

function addLinkedInPixel() {
  var pixel = document.createElement("img");
  pixel.setAttribute("src", "https://dc.ads.linkedin.com/collect/?pid=981404&conversionId=1085225&fmt=gif");
  pixel.setAttribute("height", "1");
  pixel.setAttribute("width", "1");
  pixel.setAttribute("style", "display:none;");
  pixel.setAttribute("alt", "");
  document.body.appendChild(pixel);
  console.log(pixel);
}


//waits until window load to initialize
lp.jQuery(window).load(function(){
  lp.jQuery(function($) {
    $('.lp-pom-form .lp-pom-button').unbind('click tap touchstart').bind('click.formSubmit tap.formSubmit touchstart.formSubmit', function(e) {
      if ( $('.lp-pom-form form').valid() ) yourSubmitFunction(e, $);
    });
    $('form').unbind('keypress').bind('keypress.formSubmit', function(e) {
      if(e.which === 13 && e.target.nodeName.toLowerCase() !== 'textarea' && $('.lp-pom-form form').valid() )
      yourSubmitFunction(e, $);
    });
  });
});


//get cookie
  function getCookie(co) {
    var name = co + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    console.log('get cookie function ready to fire');
    console.log(ca);
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
    }
    return "";
  }

//check cookie
  // check cookie
  function checkCookie() {
    var convert = getCookie("convert");
    if (convert != "") {       
        return true
     	console.log('check cookie returned true');
    }
    console.log('check cookie function fired');
  }


//detect if mobile or desktop
function detectMob() {
	console.log('Mobile Function Firing');

	if (
		navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/webOS/i)
       || navigator.userAgent.match(/iPhone/i)
       || navigator.userAgent.match(/iPad/i)
		) {
		return true
	} else {
		return false
	};
}


var delay = 25000;
if(detectMob()) {
	setTimeout(function () {
		if (checkCookie()) {
			console.log('MOBILE: cookie exists, not firing modal')
		} else {
			console.log('MOBILE: cookie does not exist, firing modal in xxx seconds')
		}
	}, delay);
} else {
	var _ouibounce = ouibounce(false, {
		aggressive: true,
		timer: 0,
		callback: function () {
			if (checkCookie()) {
				console.log('DESKTOP: cookie exists, not firing modal');
			} else {
				console.log('DESKTOP: cookie does not exist, fired modal')
			}
		}
	});	
}

</script>