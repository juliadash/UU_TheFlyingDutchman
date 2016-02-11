/**
 * Created by Mike on 2/8/2016.
 */

$(document).ready(function () {
    var metainfo = localStorage.getItem('metaInfo');
    $('#orderMetainfo').text(metainfo);

});

function onDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', e.target.id);
}

function onDragOver(e) {
    e.preventDefault();
}

function onDrop(e) {
    e.stopPropagation();

    var data = e.dataTransfer.getData('text');
    e.target.appendChild(document.getElementById(data));
}


