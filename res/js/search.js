$(document).ready(function () {
    var input = document.getElementById("myinput");
    src = getBeerNames();
    new Awesomplete(input, {
	list: src
    });

});
/* 
   $(document).ready(function () {
   $("#languageSelectionPlaceholder").load("header.html");
   });

*/
