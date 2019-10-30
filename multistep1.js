// these allow it to work with your page
var backButton = document.getElementById('lp-pom-button-143');
var nextButton = document.getElementById('lp-pom-button-144');
var showProgressBar = true;
var autoFocus = true;

/*-------------------------------
	Global Vars
-------------------------------*/
var submitButton = document.querySelector(".lp-pom-form .lp-pom-button");
var formContainer = document.querySelector(".lp-element .lp-pom-form");
var currentField = 0;
var allFields = document.getElementsByClassName("lp-lom-form-field");
var errorSpan = document.createElement('span');

/*-------------------------------
	Onload
-------------------------------*/
//hide all form fields
for(i=0; i < allFields.length; i++){
	allFields[i].classList.add('hide');
	allFields[i].style.top = "0px";\
}
//hide buttons
backButton.classList.add('hide');
submitButton.classList.add('hide');
//reveal first field
allFields[0].classList.remove('hide');

if (allFields[currentField].querySelector('input') && allFields[0].querySelector('input'.type) == "text" && autoFocus){
	allFields[0].querySelector('input[type=text]').focus();
}
//add error span
errorSpan.classList.add('hide');
errorSpan.style.color = 'red';
errorSpan.style.position = 'absolute';
errorSpan.id = 'validation-error';
var labelHeight;
if(allFields[0].querySelector('label')) {
	labelHeight = allFields[0].querySelector('label').clientHieght
} else {
	labelHeight = 25;
}
errorSpan.style.top = '-'+labelHeight+'px';
formContainer.appendChild(errorSpan);

//Set up progress bar
if(showProgressBar){
	//add div
	var progressContainer = document.createElement("div");
	progressContainer.id = "container";
	formContainer.appendChild(progressContainer);
	//configure progress bar
	var bar = new ProgressBar.line(container, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'},
  	from: {color: '#FFEA82'},
  	to: {color: '#74D16A'},
    text: {
      style: {
        // Text color.
        // Default: same as stroke color (options.color)
        color: '#fff',
        position: 'absolute',
        right: '0',
        top: '30px',
        padding: 0,
        margin: 0,
        transform: null
      },
      autoStyleContainer: false
	},
	step: function(state, bar){
		bar.setText((currentField+1) + 'of' + allFields.length);
		bar.path.setAttribute('stroke', state.color);
		}
	});
}
/*-------------------------------
	Functions
-------------------------------*/
var nextEvent = function(){
	//hide current field
	allFields[currentField].classList.add('hide');
	//reveal next field
	currentField +=1;
	allFields[currentField].classList.remove('hide');
	if (allFields[currentField].querySelector('input') && allFields[currentField].querySelector('input').type == 'text' ){
		allFields[currentField].querySelector('input[type-"text"]').focus();
	};
	//if current field > 0 show back
	if(currentField > 0){
		backButton.classList.remove('hide');
	}
	//if current ifled = all fields, show submit button
	if(currentField == allFields.length-1) {
		submitButton.classList.remove('hide');
		nextButton.classList.add('hide');
	}
	//progress bar
	updateProgress();
}

var backEvent = function(){
	//hide current field
	allFields[currentField].classList.add('hide');
	submitButton.classList.add('hide');
	//reveal prev field
	currentField -=1;
	allFields[currentField].classList.remove('hide');
	if (allFields[currentField].querySelector('input') && allFields[currentField].querySelector('input').type == 'text' ){
		allFields[currentField].querySelector('input[type-"text"]').focus();
	};
	//if current field is 0, hide back button
	if(currentField == 0){
		backButton.classList.add('hide');
		nextButton.classList.remove('hide');
	}
	if(currentField <= allFields.length-1){
		nextButton.classList.remove('hide');
	}
	//progress bar
	updateProgress();
}

var currentFieldInvalid = function(){
	var invalid = false;
	//run validation event
	lp.jQuery('.lp-pom-form form').validate().form();
	//get current field ID
	var currentId;
	if(allFields[currentField].querySelector('input')) {
		currentId = allFields[currentField].querySelector('input').id;
	} else {
		currentId = allFields[currentField].children[1].id;
	}
	//get error list array of objects
	var errorList = lp.jQuery('.lp-pom-form form').validate().errorList;
	//is field id in error list
	for(var i=0;i<errorList.length;i++){
		if(currentId == errorList[i].element.id){
			errorSpan.textContent = errorList[i].message;
			invalid = true;
		}
	}
	return invalid;
};

var updateProgress = function() {
	if(showProgressBar){
		var barSize = (currentField+1) / allFields.length;
		bar.animate(barSize); //number for 0.0 - 1.0
	}
};
updateProgress();

/*-------------------------------
	Event Listeners
-------------------------------*/
//click next
nextButton.addEventListener('click', function(e){
	if(currentFieldInvalid()){
		if(allFields[currentField].querySelector('input')){
			allFields[currentField].querySelector('input').classList.add("hasError");
		}else{
			allFields[currentField].children[1].classList.add("hasError");
		} 

		errorSpan.classList.remove('hide');
		e.preventDefault();
	} else {
		//remove hasError from current field
		if(allFields[currentField].querySelector('input')){
			allFields[currentField].querySelector('input').classList.remove("hasError");
		}else{
			allFields[currentField].children[1].classList.remove("hasError");
		}
		errorSpan.classList.add('hide');
		nextEvent();
	}
});
//click back
backButton.addEventListener('click', function(){
	backEvent();
});

//submit button click
submitButton.addEventListener('click', function(e){
	if(currentFieldInvalid()){
		if(allFields[currentField].querySelector('input')){
			allFields[currentField].querySelector('input').classList.add("hasError");
		}else{
			allFields[currentField].children[1].classList.add("hasError");
		} 

		errorSpan.classList.remove('hide');
		e.preventDefault();
	} else {
		//remove hasError from current field
		if(allFields[currentField].querySelector('input')){
			allFields[currentField].querySelector('input').classList.remove("hasError");
		}else{
			allFields[currentField].children[1].classList.remove("hasError");
		}
		errorSpan.classList.add('hide');
	}
});

//enter key
document.body.addEventListener('keydown', function(e){
	var keyCode = e.keyCode || e.which;
	//enter key & 
	if(keyCode === 13 && currentField < allFields.length-1) {
		if(currentFieldInvalid()){
			if(allFields[currentField].querySelector('input')){
				allFields[currentField].querySelector('input').classList.add("hasError");
			}else{
				allFields[currentField].children[1].classList.add("hasError");
			} 

			errorSpan.classList.remove('hide');
			e.preventDefault();
		} else {
			//remove hasError from current field
			if(allFields[currentField].querySelector('input')){
				allFields[currentField].querySelector('input').classList.remove("hasError");
			}else{
				allFields[currentField].children[1].classList.remove("hasError");
			}
			errorSpan.classList.add('hide');
			nextEvent();
		}

	} else if(keyCode === 13 && currentField === allFields.length - 1) {
		if(currentFieldInvalid()){
			if(allFields[currentField].querySelector('input')){
				allFields[currentField].querySelector('input').classList.add("hasError");
			}else{
				allFields[currentField].children[1].classList.add("hasError");
			} 

			errorSpan.classList.remove('hide');
			e.preventDefault();
		} else {
			//remove hasError from current field
			if(allFields[currentField].querySelector('input')){
				allFields[currentField].querySelector('input').classList.remove("hasError");
			}else{
				allFields[currentField].children[1].classList.remove("hasError");
			}
			errorSpan.classList.add('hide');
		}

	} else {
		//remove hasError from current field
		if(allFields[currentField].querySelector('input')){
			allFields[currentField].querySelector('input').classList.remove("hasError");
		}else{
			allFields[currentField].children[1].classList.remove("hasError");
		}
		errorSpan.classList.add('hide');
	}
	//left key
	if(keyCode === 37){
		if(currentField>0){
			backEvent();
		}
	}

	//rigth key
	else if (keyCode === 39){
		if(currentField < allFields.length-1){
      if(currentFieldInvalid()){
        //add hasError to current field
        if(allFields[currentField].querySelector('input')){
          		allFields[currentField].querySelector('input').classList.add("hasError");
        	}else{
          		allFields[currentField].children[1].classList.add("hasError");  
        	}	
        
        		errorSpan.classList.remove('hide');
        		e.preventDefault();
      		}else{
        	//remove hasError from current field
        		if(allFields[currentField].querySelector('input')){
          			allFields[currentField].querySelector('input').classList.remove("hasError");
        		}else{
          			allFields[currentField].children[1].classList.remove("hasError");  
        		}
        
        		errorSpan.classList.add('hide');
        		nextEvent();
      		}  
    	}
	}
})

