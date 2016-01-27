/**
 * Created by Mike on 1/27/2016.
 */

$(document).ready(function(){
    $("#btn").click(function(){
        //alert($(this).prop("value"));
        if ($("#btn").prop("value") == "click me!") {
            $("#btn").prop('value', 'do not click me!');
        } else {
            $("#btn").prop('value', 'click me!');
        }
    });
});
