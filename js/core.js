/**
 * Created by Mike on 2/9/2016.
 */

$(document).ready(function () {
    $("#languageSelectionPlaceholder").load("header.html");
});

const ORDER_LIST_NODE_ID = "orderList";

var undoStack = [];
var redoStack = [];

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

    addToUndoManager(data);
}

function addToUndoManager(o) {
    undoStack.push(o);
}

function doUndo(e){
    var draggableElementID = undoStack.pop();
    var draggableElement = document.getElementById(draggableElementID);
    var parentNode = draggableElement.parentNode;
    var dropNode = document.getElementById("orign_" + draggableElementID);

    parentNode.removeChild(draggableElement);
    dropNode.appendChild(draggableElement);

    redoStack.push(draggableElementID);
}

function doRedo(e){
    var draggableElementID = redoStack.pop();
    var draggableElement = document.getElementById(draggableElementID);
    var parentNode = draggableElement.parentNode;
    var dropNode = document.getElementById(ORDER_LIST_NODE_ID);

    parentNode.removeChild(draggableElement);
    dropNode.appendChild(draggableElement);

    undoStack.push(draggableElementID);
}