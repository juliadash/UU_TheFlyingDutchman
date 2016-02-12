/**
 * Created by Mike on 2/9/2016.
 */

$(document).ready(function () {
    $("#languageSelectionPlaceholder").load("header.html");
});

const BEER_VIEW_URL = "http://localhost/UU_TheFlyingDutchman/ordering.html#Beers";
const KEYCODE_CTRL_Z = 90;
const KEYCODE_CTRL_Y = 89;

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

var DraggableObject = function (draggableElementID, previousParentNodeID) {

    var _draggableElementID = draggableElementID;
    var _previousParentNodeID = previousParentNodeID;

    this.getDraggableElementID = function () {
        return _draggableElementID;
    };

    this.getPreviousParentNodeID = function () {
        return _previousParentNodeID;
    };

    this.setPreviousParentNodeID = function (previousParentNodeID) {
        _previousParentNodeID = previousParentNodeID;
    };
};

var DragCommand = function (draggableObject) {
    this.doUndo = function () {
        draggableElement = document.getElementById(draggableObject.getDraggableElementID());
        destinationNode = document.getElementById(draggableObject.getPreviousParentNodeID());
        currentParentNode = draggableElement.parentNode;

        currentParentNode.removeChild(draggableElement);
        destinationNode.appendChild(draggableElement);
        draggableObject.setPreviousParentNodeID(currentParentNode.id);
    };
};

var undoManager = new UndoManager();

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

    draggableObject = new DraggableObject(draggableElementID, parentNodeID);
    undoManager.add(new DragCommand(draggableObject));
}

function doUndo(e) {
    undoManager.undo();
}

function doRedo(e) {
    undoManager.redo();
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