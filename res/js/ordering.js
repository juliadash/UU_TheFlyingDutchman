/**
 * Created by Mike on 2/8/2016.
 */

$(document).ready(function () {

    var metainfo = localStorage.getItem('metaInfo'); //TODO: change getItem() to removeItem()
    $('#orderMetainfo').text(metainfo);

});


