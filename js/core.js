/**
 * Created by Mike on 2/9/2016.
 */

$(document).ready(function () {
    $("#languageSelectionPlaceholder").load("header.html");
});

const BEER_VIEW_URL = "http://localhost/UU_TheFlyingDutchman/ordering.html#Beers";
const ORDER_LIST_NODE_ID = "orderList";
const KEYCODE_CTRL_Z = 90;
const KEYCODE_CTRL_Y = 89;

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

function doUndo(e) {
    if (undoStack.length != 0) {
        var draggableElementID = undoStack.pop();
        var draggableElement = document.getElementById(draggableElementID);
        var parentNode = draggableElement.parentNode;
        var dropNode = document.getElementById("orign_" + draggableElementID);

        parentNode.removeChild(draggableElement);
        dropNode.appendChild(draggableElement);

        redoStack.push(draggableElementID);
    }
}

function doRedo(e) {
    if (redoStack != 0) {
        var draggableElementID = redoStack.pop();
        var draggableElement = document.getElementById(draggableElementID);
        var parentNode = draggableElement.parentNode;
        var dropNode = document.getElementById(ORDER_LIST_NODE_ID);

        parentNode.removeChild(draggableElement);
        dropNode.appendChild(draggableElement);

        undoStack.push(draggableElementID);
    }
}

window.onkeyup = function (e) {
    if (document.URL === BEER_VIEW_URL) {
        var keyCode = event.keyCode;
        if (keyCode === KEYCODE_CTRL_Z) {
            doUndo(e);
        } else if (keyCode === KEYCODE_CTRL_Y) {
            doRedo(e);
        }
    }
};