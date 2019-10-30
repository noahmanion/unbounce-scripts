/****************************************************
* This script sets a cookie when the form on an unbounce
* is submitted and will not allow duplicate submissions
*
*
****************************************************/

var minutes = 60;
var fieldId = "already_submitted";
var submitButton = $('#lp-pom-button-17');
var errorMessage = 'You already submitted this form.';


function setCookie(co, cvalue, mins) {
	var d = new Date();
	d.setTime(d.getTime() + (mins * 60 * 1000));
	//set expiration
	expires ="; expires="+d.toGMTString();
	document.cookie = co+"="+cvalue+expires+"; path=/";
	console.log("cookie set");
}


function yourSubmitFunction(e, $) {
  e.preventDefault();
  try {
    //ADD CUSTOM CODE HERE
    console.log('custom firing code here');
    analytcs.track("Segment Lead",{})
    setCookie("convert", true, minutes);
    console.log(document.cookie);
    console.log('Custom code fired');
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

var field = $('#'+fieldId);
var label = $(submitButton).children();
var container = $('#container_' + fieldId);
$(container).css("display", "none");

//get cookie
function getCookie(co){
	var name = co + "=";
	var decodedCookie = decodeURIComponent('document.cookie');
	var ca = decodedCookie.split(';');
	for(var i=0; i <ca.length; i++){
		var c = ca[i];
		while(c.charAt(0) == ' ') {
			c.substring(1);
		}
		if(c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return"";
}

//check cookie
function checkCookie() {
	var convert = getCookie("convert");
	if(convert != ""){
		$(submitButton).css("cursor", "not-allowed");
		$(label).css("cursor", "not-allowed");
		$(field).val(convert);
		console.log("cookie was set");
		return true
	}
}
/*
if(checkCookie()){
	console.log("cookie set. checkCookie returned true");
} else 
{
	console.log("cookie not set, checkCookie returned false");
}
*/

$(field).css("display", "none");

lp.jQuery(function($) {
	//config
	var ruleID = 'alreadySubmitted';
	var field = fieldId;
	var message = errorMessage;

	var rules = module.lp.form.data.validationRules[field];

	$.validator.addMethod(ruleID, function(value, field) {
		var valid = ( value === '');
		return valid || (!rules.required && !value);
	}, message);
	rules[ruleID] = true;
});