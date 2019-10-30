/*
<script type="text/javascript" src="https://conversational-form-0iznjsw.stackpathdns.com/conversational-form.min.js" crossorigin></script>
<script>
*/
$("name").attr("pattern", "/^$|\s+/");
var formElm = document.getElementsByClassName("lp-pom-form")[0];
var context = $(formElm).parent()[0];

$(formElm).conversationalForm({
	context: context,
	submitCallback: (e) => {
		window.conversationalForm.addRobotChatResponse("Awesome. Thanks for your time!");//this should be whatever your final message is
		lp.jQuery('.lp-pom-form form').submit();
	},
	robotImage: "http://unbounce.wpengine.netdna-cdn.com/photos/Unbounce-icon-light-background.png",
	userImage: "https://commons.wikimedia.org/wiki/File%3ASolid_white.png"
});

document.querySelector('#conversational-form > cf-input > cf-input-control-elements > cf-list > cf-button:nth-child(3)').addEventListener("click"function () {
	console.log("clicked homeowner")
})


