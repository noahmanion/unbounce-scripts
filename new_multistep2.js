lp.jQuery('.lp-pom-form form').unbounceMultiStep({
	steps: [
	{ title: 'Title 1', fields: 1},
	{ title: 'Title 2', fields: 1},
	{ title: 'Title 3', fields: 1}
	{ title: 'Title 4', fields: 1}
	],
	nextButton: 'Continue',
	backButton: "Back"
});

lp.jQuery('form#fields').css('margin-top', '20px');

lp.jQuery('#progress_bar').hide();

lp.jQuery('fieldset.step:last-of-type div.lp-pom-form-field').css('float','left');

lp.jQuery('fieldset.step:last-of-type div.lp-pom-form-field').css('width','150px');

lp.jQuery('fieldset.step:last-of-type div.lp-pom-form-field input').css('width','140px');

lp.jQuery('fieldset.step:last-of-type div.lp-pom-form-field select').css('width','140px');

lp.jQuery('fieldset.step:last-of-type div.lp-pom-form-field:last-of-type select').css('width','140px');
  
lp.jQuery('#Country').val('United States');
  
  var disclaimer = '<p style="margin-top: 55px; font-family:arial,helvetica,sans-serif;font-size: 10px; color: #636363; line-height: 12px; padding: 40px 0 20px 0;"> I like cats because they are fat and fluffy always ensure to lay down in such a manner that tail can lightly brush humans nose , for run outside as soon as door open. Chase ball of string lounge in doorway or give me some of your food give me some of your food give me some of your food meh, i dont want it yet plan steps for world domination so touch water with paw then recoil in horror for chase dog then run away i shredded your linens for you.</p>';

lp.jQuery('fieldset.step: last-of-type').append(disclaimer);

lp.jQuery(window).keydown(function(event){
	if(event.keyCode == 13) {
		event.preventDefault();
		return false;
	}
});