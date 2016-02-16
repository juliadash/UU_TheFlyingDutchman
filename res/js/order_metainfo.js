/**
 * Created by Mike on 2/9/2016.
 */

$(document).ready(function(){

    $("#submitOrderMetainfo").click(function() {
        var metaInfo = $('#orderName').val();
        localStorage.setItem('metaInfo', metaInfo);
    });

});
