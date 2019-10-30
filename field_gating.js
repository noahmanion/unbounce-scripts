/****************************************************
* This script takes a form with a dropdown and will
* either show the rest of the form or redirect the
* based on the selection of the dropdown
*
****************************************************/

(function(){
  //ID of Submit Button
  var submitBtn = $("#lp-pom-button-14"); 
  
  //ID of dropdown field
  var field = $("#industry_homeowner")
  
  // Number of fields to show/hide with dropdown
  var count = 3;
  
  // Adjust to fine tune placement of other form fields
  var space = 2;
  
  // Add the ID of the containing element (box) of your form if one exists
  // Leave as "" if there is no box containing the form.
  var box = "#lp-pom-box-18";
  
    //get url params
  function getParams() {
    var url = window.location.href;
    var params = url.split("?")[1];
    return params;
  }
  
  // DO NOT EDIT CODE BELOW
  var conFields = field.parent().nextAll().slice(0, +count);
  var moreFields = field.parent().nextAll().slice(count);
  
  // function to add the heights of all fields selected 
  $(conFields).each(function() {
    var height = $(this).outerHeight(true);
    //console.log("Setting height for " + $(this));
    space = space += height;
  });
  
  // hide fields
  conFields.css("display", "none");
  submitBtn.css("display", "none");
  // position other form fields
  $(moreFields).each(function() {
    $(this).animate({top: "-=" + space},0);
    //console.log("positioning " + $(this));
  });
  
  // function to show/hide fields
  var z = true;
  var box = $(box);
  $(field).change(function() {
    
    if($(this).val() == "Homeowner") {
      //do something
      //alert("At this point we'd redirect to the homeowner page");
      var queryString = getParams();
      analytics.track("Homeowner Redirect");
      window.location.href= "https://try.landscapehub.com/homeowners/?" + queryString;
    } else {
          // adjust position of fields
    var fieldAdjust = function(h, dir) {
      if (dir == "up") {
        console.log("direction is up")
        $(moreFields).each(function() {
          $(this).animate({top: "-=" + (h+5)}, 600)
          //console.log('animating' + $(this));
        });
        //submitBtn.animate({top: "-=" + (h+5)}, 600)
        //console.log('animating submit');
        if (box != "") {
         //box.animate({top: "-=" + (h+5)}, 600)
        }
      } else if (dir == "down") {
        console.log('directon is down')
        $(moreFields).each(function() {
          $(this).animate({top: "-=" + ((h*count)+5)}, 600)
          //console.log('animating' + $(this));
        });
        //submitBtn.animate({top: "-=" + ((h*count)+5)}, 600)
        //console.log('animating submit');
        if (box != "") {
         //box.animate({top: "-=" + ((h*count)+5)}, 600)
         //console.log('animating box');
        }
      }
    }  
    var fieldGroup = range(0, count);
    if ((this.selectedIndex - 1)in fieldGroup) {
      var revealNum = this.selectedIndex-1;
    } else {
      var revealNum = -1;
    }
    var revealField = conFields.get(revealNum);
    var otherFields = conFields.not(revealField);
    var fieldHeight = $(revealField).outerHeight(true);
    if (revealNum in fieldGroup) { 
      $(revealField).fadeIn("slow");
      $(otherFields).fadeIn("slow");
      submitBtn.fadeIn("slow");
      if (z) {
        fieldAdjust(fieldHeight,"up");
        z = false;
      }
    } else {
      $(revealField).fadeOut("slow");
      $(otherFields).fadeOut("slow");
      fieldAdjust(fieldHeight, "down");
      z = true;
    }
    }
    
  });
  function range(start, end) {
    var array = new Array();
    for(var i = start; i < end; i++) {
        array.push(i);
    }
    return array;
  }
})();