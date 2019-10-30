  function UnbounceMultiStep(form, options) {

  // Validate arguments
  if ( !form.is('.lp-pom-form form') )
    return console.error('jQuery.unbounceMultiStep must be called on an Unbounce form.');

  if ( typeof options !== 'object' )
    return console.error('No options were passed to jQuery.unbounceMultiStep');

  this.options = options;

  // Store DOM elements
  this.form = form;
  this.formContainer = this.form.closest('.lp-pom-form');
  this.fields = this.form.find('div.lp-pom-form-field');
  this.fieldsByStep = [];
  this.currentStep = 0;
  this.forwardButton = this.formContainer.find('.lp-pom-button').eq(0);
  //this.validationError = $('.lp-form-errors');
  
  // Verbiage
  this.text = {};  
  this.text.next = this.options.nextButton;
  this.text.showSteps = this.options.showSteps;
  this.text.back = this.options.backButton;
  this.text.submit = this.forwardButton.children('span').html();

  // Call constructor method
  this.init();
}

UnbounceMultiStep.prototype.init = function() {
  var _this = this;

  this.formContainer.addClass('multistep initial');
  this.form.attr('id', 'fields');

  // Add progress bar
  this.formContainer.prepend('<div id="progress-bar"></div>');
  this.progressBar = lp.jQuery('#progress-bar');

  // Replicate Unbounce's field spacing
  var height = parseInt( this.fields.eq(0).css('height'), 10);
  var top = parseInt( this.fields.eq(1).css('top'), 10);
  this.fields.css('margin-bottom', (top - height) + 'px');
  this.progressBar.css('margin-bottom', (top - height) + 'px');

  // Set up fieldset elements for each step
  for ( var i = 0 ; i < this.options.steps.length ; i ++ ) {
    console.log('Adding new fieldset.');
    this.form.append('<fieldset></fieldset>');
  }
  this.steps = this.form.find('fieldset');
  this.steps.addClass('step');

  // Sort fields into new steps
  var currentField = 0;
  for ( currentStep = 0 ; currentStep < this.options.steps.length ; currentStep ++ ) {
    this.progressBar.append('<div class="step">' +
                            '<span class="num">'+ (currentStep + 1) +'</span>' +
                            '<span class="title">'+ this.options.steps[currentStep].title +'</span>' +
                            '</div>');
    this.fieldsByStep[currentStep] = [];
    for ( i = 0 ; i < this.options.steps[currentStep].fields ; i ++ ) {
      console.log('Field ' + currentField + ' -> step ' + currentStep );
      this.fields.eq( currentField ).appendTo( this.steps.eq( currentStep ) );
      this.fieldsByStep[ currentStep ].push( this.fields.eq( currentField ) );
      currentField ++;
    }
  }

  // Add any remaining fields to last step
  if ( currentField < this.fields.length ) {
    currentStep --;
    for ( i = currentField ; i < this.fields.length ; i ++ ) {
      console.log('Field ' + currentField + ' -> step ' + currentStep );
      this.fields.eq( currentField ).appendTo( this.steps.last() );
      this.fieldsByStep[ currentStep ].push( this.fields.eq( currentField) );
      currentField ++;
    }
  }
  console.log(this.fieldsByStep);

  this.progressBarItems = lp.jQuery('#progress-bar .step');

  // Add a back button
  this.backButton = this.forwardButton.clone().insertBefore(this.forwardButton);
  this.backButton.addClass('back-button');
  this.backButton.children('span').html(this.text.back);

  // Only validate fields that are in current step
  $.each(window.module.lp.form.data.validationRules, function() {
    if ( this.required === true ) { this.required = {
      depends: function () { return $(this).is('.active :input')}
    };
  }
  });

  // Add event listeners
  $(function() {
   _this.backButton.unbind('click touchstart').bind('click.unbounceMultiStep', function(e) {
      _this.backHandler();
    });
    
    //_this.backButton.removeAttr('href');  
    _this.backButton.attr('href','#request');

    _this.forwardButton.unbind('click touchstart').bind('click.unbounceMultiStep', function() {
      _this.forwardHandler();
    });
    
    //_this.forwardButton.removeAttr('href');
    _this.forwardButton.attr('href','#request');
  });

  // Show first step
  this.goToStep(0);
};

UnbounceMultiStep.prototype.goToStep = function ( newStep ) {
  // Make sure we aren't going to a steΩp that doesn't exist
  if ( newStep < 0 || newStep >= this.steps.length ) return false;

  this.steps.eq( this.currentStep ).removeClass('active').hide();
  this.steps.eq( newStep ).addClass('active').fadeIn();

  this.progressBarItems.eq( this.currentStep ).removeClass('active');
  this.progressBarItems.eq( newStep ).addClass('active');

  this.formContainer.toggleClass('initial', newStep === 0);

  // Update the label of the forward button
  var current = parseInt(newStep) + 2;
  var total = this.steps.length;
  var nextText = this.text.showSteps ? this.text.next + ' (Step ' + current + ' of ' + total + ")" : this.text.next;
  var submitText = this.text.submit;
  
  var forwardButtonLabel = ( newStep === this.steps.length - 1 ) ? submitText : nextText;
  console.log(forwardButtonLabel);
  this.forwardButton.children('span').html(forwardButtonLabel);

  this.currentStep = newStep;
};

UnbounceMultiStep.prototype.validate = function () {
  return this.form.valid();
};

UnbounceMultiStep.prototype.forwardHandler = function () {

  // Prevent going to next step or submitting if step isn't valid
  if ( !this.validate() )
  {$('.lp-form-errors').appendTo( '#' + window.module.lp.form.data.formContainerId );
    return false;}
  
  
  if ( this.currentStep === this.steps.length - 1 ) {
    this.form.submit();
    this.goToStep(0);
  }else{
    //$('#reg_nurse_disclaimer').hide();  
    this.goToStep( this.currentStep + 1 );
  }
};

UnbounceMultiStep.prototype.backHandler = function () {
  this.goToStep( this.currentStep -1 );

  // Refresh the validation status
  this.validate();
};

//jQuery plugin
lp.jQuery.fn.unbounceMultiStep = function(options) {
  window.ms = new UnbounceMultiStep(this, options);
  return this;
};
