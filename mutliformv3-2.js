  jQuery('.lp-pom-form form').unbounceMultiStep({
  steps: [
    { title: 'Title 1', fields: 2 },
    { title: 'Title 2', fields: 1 },
    { title: 'Title 2', fields: 1 },
    { title: 'Title 3', fields: 1 }
   ],
  nextButton: 'Continue',
  backButton: 'Back'
});
  
lp.jQuery('form#fields').css('margin-top','20px');

lp.jQuery('#progress-bar').hide();

lp.jQuery('fieldset.step:last-of-type div.lp-pom-form-field').css('float','left');

lp.jQuery('fieldset.step:last-of-type div.lp-pom-form-field').css('width','150px');

lp.jQuery('fieldset.step:last-of-type div.lp-pom-form-field input').css('width','140px');

lp.jQuery('fieldset.step:last-of-type div.lp-pom-form-field select').css('width','140px');

lp.jQuery('fieldset.step:last-of-type div.lp-pom-form-field:last-of-type select').css('width','140px');
  
lp.jQuery('#Country').val('United States');
  
  var disclaimer = '<p></p>';


lp.jQuery('fieldset.step:last-of-type').append(disclaimer);
  
lp.jQuery(window).keydown(function(event){
if(event.keyCode == 13) {
    event.preventDefault();
    return false;
}
  });
