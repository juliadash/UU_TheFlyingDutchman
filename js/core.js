/**
 * Created by Mike on 2/9/2016.
 */

$(document).ready(function () {
    $("#languageSelectionPlaceholder").load("header.html");
});

/**
 * undo implementation
 *
 **/

var UndoManager = function () {

    var _pointer = -1;
    var _undoStack = [];

    this.add = function (command) {
        _undoStack[++_pointer] = command;
    };

    this.undo = function () {
        if (_pointer != -1) {
            command = _undoStack[_pointer--];
            command.doUndo();
        }
    };

    this.redo = function () {
        if (_pointer != _undoStack.length - 1) {
            command = _undoStack[++_pointer];
            command.doUndo();
        }
    };
};

var DragCommand = function (draggableElementID, previousParentNodeID) {

    var _draggableElementID = draggableElementID;
    var _previousParentNodeID = previousParentNodeID;

    this.doUndo = function () {
        draggableElement = document.getElementById(_draggableElementID);
        destinationNode = document.getElementById(_previousParentNodeID);
        currentParentNode = draggableElement.parentNode;

        currentParentNode.removeChild(draggableElement);
        destinationNode.appendChild(draggableElement);
        _previousParentNodeID = currentParentNode.id;
    };
};

var quantityCommand = function(productNodeId, quantity) {

    _productNodeId = productNodeId;
    _previousQuantity = quantity;

    this.doUndo = function () {
        productNode = document.getElementById(productNodeId);
    };
};

var undoManager = new UndoManager();

function doUndo(e) {
    undoManager.undo();
}

function doRedo(e) {
    undoManager.redo();
}

const BEER_VIEW_URL = "http://localhost/UU_TheFlyingDutchman/ordering.html#Beers";
const KEYCODE_CTRL_Z = 90;
const KEYCODE_CTRL_Y = 89;

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


/**
 * drag and drop implementation
 *
 **/

function onDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', e.target.id);
}

function onDragOver(e) {
    e.preventDefault();
}

function onDrop(e) {
    e.stopPropagation();

    draggableElementID = e.dataTransfer.getData('text');
    draggableElement = document.getElementById(draggableElementID);
    parentNodeID = draggableElement.parentNode.id;
    e.target.appendChild(draggableElement);

    if (!undoManager) {
        undoManager = new UndoManager();
    }

    undoManager.add(new DragCommand(draggableElementID, parentNodeID));
}