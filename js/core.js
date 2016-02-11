/**
 * Created by Mike on 2/9/2016.
 */

$(document).ready(function(){
    $("#languageSelectionPlaceholder").load("header.html");
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

