System.register(["./Definitions"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Defs, Klondike;
    return {
        setters: [
            function (Defs_1) {
                Defs = Defs_1;
            }
        ],
        execute: function () {
            Klondike = (function () {
                function Klondike(bindings) {
                    var _this = this;
                    this._bindings = {
                        cardPileID: "",
                        abanCardPileID: "",
                        finishStackClass: "",
                        coveredStackClass: "",
                        cardClass: "",
                        solveID: "",
                        redealID: "",
                        recallID: ""
                    };
                    this._dropCardCallback = function (target, cardDiv, stackDiv) {
                        if (!cardDiv && !stackDiv) {
                            cardDiv = target;
                            stackDiv = (target.parentNode);
                            _this._eventType = "dblclick";
                            (stackDiv.lastChild === cardDiv) ? _this._draggedType = "card" : _this._draggedType = "cardArray";
                        }
                        if (_this._draggedType == "cardArray") {
                            if (_this._eventType == "dblclick")
                                return;
                            else
                                for (var i = 0; i < stackDiv.children.length; i++)
                                    if (stackDiv.children[i] === cardDiv)
                                        _this._draggedCardIndex = i;
                        }
                        else
                            _this._draggedCardIndex = stackDiv.children.length - 1;
                        _this._draggedOrigClass = stackDiv.id.slice(0, -2);
                        _this._draggedOrigIndex = (stackDiv.id === "abandoned-card-pile") ?
                            0 : parseInt(stackDiv.id.charAt(stackDiv.id.length - 1));
                        if (_this._eventType == "drag") {
                            _this._droppedDestClass = target.id.slice(0, -2);
                            _this._droppedDestIndex = parseInt(target.id.charAt(target.id.length - 1));
                            target.classList.remove("high-light");
                        }
                        if (_this._moveCardData()) {
                            switch (_this._draggedType) {
                                case "cardArray":
                                    var tempArr = document.createElement("div");
                                    for (var i = stackDiv.children.length - 1; i >= _this._draggedCardIndex; i--) {
                                        tempArr.appendChild(stackDiv.children[i]);
                                    }
                                    while (tempArr.children.length)
                                        target.appendChild(tempArr.lastChild);
                                    break;
                                case "card":
                                    if (_this._eventType === "dblclick")
                                        document.getElementsByClassName(_this._droppedDestClass)[_this._droppedDestIndex].appendChild(cardDiv);
                                    else
                                        target.appendChild(cardDiv);
                                    break;
                            }
                            if (stackDiv.classList.contains("covered-stack") && stackDiv.children.length)
                                _this._uncoverTopCard(stackDiv);
                        }
                        _this._endGameJudgement();
                    };
                    this._moveCardData = function () {
                        var origin, destiny;
                        switch (_this._draggedOrigClass) {
                            case "finish-stack":
                                origin = _this.finishStacks[_this._draggedOrigIndex];
                                break;
                            case "covered-stack":
                                origin = _this.coveredStacks[_this._draggedOrigIndex];
                                break;
                            case "abandoned-card-pi":
                                origin = _this.abanCardPile;
                                break;
                            default:
                                try {
                                    throw "Origin received unexpected class name.";
                                }
                                catch (e) {
                                    console.log(e);
                                }
                                return false;
                        }
                        if (_this._eventType === "dblclick") {
                            if (origin[origin.length - 1].card === 0) {
                                for (var i = 0; i < _this.finishStacks.length; i++) {
                                    if (!_this.finishStacks[i].length) {
                                        _this._droppedDestClass = "finish-stack";
                                        _this._droppedDestIndex = i;
                                        break;
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < _this.finishStacks.length; i++) {
                                    if (!_this.finishStacks[i].length)
                                        continue;
                                    if (_this.finishStacks[i][_this.finishStacks[i].length - 1].suit === origin[origin.length - 1].suit &&
                                        _this.finishStacks[i][_this.finishStacks[i].length - 1].card === origin[origin.length - 1].card - 1) {
                                        _this._droppedDestClass = "finish-stack";
                                        _this._droppedDestIndex = i;
                                        break;
                                    }
                                }
                                if (!_this._droppedDestClass)
                                    return false;
                            }
                        }
                        switch (_this._droppedDestClass) {
                            case "finish-stack":
                                destiny = _this.finishStacks[_this._droppedDestIndex];
                                if (destiny === origin)
                                    return false;
                                else if (_this._draggedType == "cardArray")
                                    return false;
                                else if (!destiny.length) {
                                    if (origin[origin.length - 1].card) {
                                        alert("First card of this slot must be an Ace!");
                                        return false;
                                    }
                                }
                                else {
                                    if (origin[origin.length - 1].suit !== destiny[0].suit) {
                                        alert("Suits of cards in this slot must be all the same!");
                                        return false;
                                    }
                                    else if (origin[origin.length - 1].card !== destiny[destiny.length - 1].card + 1) {
                                        alert("Card dropped on top of this slot must be 1 point larger than card below it!");
                                        return false;
                                    }
                                }
                                break;
                            case "covered-stack":
                                destiny = _this.coveredStacks[_this._droppedDestIndex];
                                if (destiny === origin)
                                    return false;
                                else if (_this._draggedType == "cardArray") {
                                    if (!destiny.length) {
                                        if (origin[_this._draggedCardIndex].card !== 12)
                                            return false;
                                    }
                                    else if (Math.abs(origin[_this._draggedCardIndex].suit % 2 - destiny[destiny.length - 1].suit % 2) !== 1) {
                                        return false;
                                    }
                                    else if (origin[_this._draggedCardIndex].card !== destiny[destiny.length - 1].card - 1) {
                                        return false;
                                    }
                                }
                                else if (!destiny.length) {
                                    if (origin[origin.length - 1].card !== 12) {
                                        alert("First card of this slot must be a King!");
                                        return false;
                                    }
                                }
                                else {
                                    if (Math.abs(origin[origin.length - 1].suit % 2 - destiny[destiny.length - 1].suit % 2) !== 1) {
                                        alert("Card dropped on top of this slot must be different color of card below it!");
                                        return false;
                                    }
                                    else if (origin[origin.length - 1].card !== destiny[destiny.length - 1].card - 1) {
                                        alert("Card dropped on top of this slot must be 1 point less than card below it!");
                                        return false;
                                    }
                                }
                                break;
                            case "abandoned-card-pi":
                                return false;
                            default:
                                try {
                                    throw "Destiny received unexpected class name.";
                                }
                                catch (e) {
                                    console.log(e);
                                }
                                return false;
                        }
                        switch (_this._draggedType) {
                            case "cardArray":
                                var tempArr = Array(0);
                                for (var i = origin.length - 1; i >= _this._draggedCardIndex; i--)
                                    tempArr.push(origin.pop());
                                while (tempArr.length)
                                    destiny.push(tempArr.pop());
                                destiny = destiny.concat(origin.slice(_this._draggedCardIndex, origin.length));
                                break;
                            case "card":
                                destiny.push(origin.pop());
                                break;
                            default:
                                try {
                                    throw "Unexpected draggedType value.";
                                }
                                catch (e) {
                                    console.log(e);
                                }
                                return false;
                        }
                        return true;
                    };
                    this._endGameJudgement = function () {
                        if ((function () {
                            for (var i = 0; i < _this.finishStacks.length; i++)
                                if (_this.finishStacks[i].length !== 13)
                                    return false;
                            return true;
                        })()) {
                            for (var i = 0; i < document.getElementsByClassName("poker-card").length; i++)
                                (document.getElementsByClassName("poker-card")[i]).draggable = false;
                            alert("Congratulations! You have won the game!");
                        }
                    };
                    this.cardPile = Defs.createDeck();
                    this.abanCardPile = new Array(0);
                    this.coveredStacks = Defs.createCoveredStacks(7);
                    this.finishStacks = Defs.createFinishStacks();
                    this._bindings = bindings;
                    this.dealCards();
                    this.onClickCardPile();
                    this.dragCard();
                    this.dbClickCard();
                    this.hint();
                    this.solve();
                    this.redeal();
                    this.recall();
                }
                Klondike.prototype._uncoverTopCard = function (coveredStack) {
                    if (coveredStack.lastChild.lastChild.classList.contains("hide")) {
                        coveredStack.lastChild.lastChild.classList.remove("hide");
                        this._toggleDraggable(coveredStack.lastChild);
                    }
                };
                Klondike.prototype._toggleDraggable = function (cardDiv) {
                    (cardDiv.draggable) ? cardDiv.draggable = false : cardDiv.draggable = true;
                };
                Klondike.prototype.dealCards = function () {
                    var cardPileDiv = document.getElementById(this._bindings["cardPileID"]);
                    var coveredStackDivs = document.getElementsByClassName(this._bindings["coveredStackClass"]);
                    for (var i = 0; i < this.coveredStacks.length; i++)
                        for (var j = 0; j < this.coveredStacks[i].length; j++)
                            this.coveredStacks[i][j] = this.cardPile.pop();
                    for (var i = 0; i < this.cardPile.length; i++)
                        cardPileDiv.appendChild(this.cardPile[i].cardElement);
                    for (var i = 0; i < this.coveredStacks.length; i++) {
                        for (var j = 0; j < this.coveredStacks[i].length; j++)
                            coveredStackDivs[i].appendChild(this.coveredStacks[i][j].cardElement);
                        this._uncoverTopCard(coveredStackDivs[i]);
                    }
                };
                Klondike.prototype.onClickCardPile = function () {
                    var rThis = this;
                    var cardPileDiv = document.getElementById(this._bindings["cardPileID"]);
                    var abanCardPileDiv = document.getElementById(this._bindings["abanCardPileID"]);
                    cardPileDiv.addEventListener("mouseup", function () {
                        if (this.children.length) {
                            this.lastChild.lastChild.classList.remove("hide");
                            rThis._toggleDraggable(this.lastChild);
                            abanCardPileDiv.appendChild(this.lastChild);
                            rThis.abanCardPile.push(rThis.cardPile.pop());
                        }
                        else {
                            while (abanCardPileDiv.children.length) {
                                this.appendChild(abanCardPileDiv.lastChild);
                                rThis._toggleDraggable(this.lastChild);
                                this.lastChild.lastChild.classList.add("hide");
                                rThis.cardPile.push(rThis.abanCardPile.pop());
                            }
                        }
                    });
                };
                Klondike.prototype.dragCard = function () {
                    var rThis = this;
                    var cardDivs = document.getElementsByClassName(this._bindings["cardClass"]);
                    var finishStackDivs = document.getElementsByClassName(this._bindings["finishStackClass"]);
                    var coveredStackDivs = document.getElementsByClassName(this._bindings["coveredStackClass"]);
                    var draggedCardDiv;
                    var draggedStackDiv;
                    document.addEventListener("dragover", function (evt) { evt.preventDefault(); });
                    document.addEventListener("drop", function (evt) { evt.preventDefault(); });
                    for (var i = 0; i < cardDivs.length; i++) {
                        cardDivs[i].addEventListener("dragstart", function (evt) {
                            evt.dataTransfer.setData("text/plain", "zero");
                            draggedCardDiv = this;
                            draggedStackDiv = this.parentNode;
                            rThis._eventType = "drag";
                            (draggedStackDiv.lastChild === draggedCardDiv) ? rThis._draggedType = "card" : rThis._draggedType = "cardArray";
                        });
                        cardDivs[i].addEventListener("dragend", function () {
                        });
                    }
                    for (var i = 0; i < this.finishStacks.length; i++) {
                        finishStackDivs[i].addEventListener("dragenter", function () {
                            this.classList.add("high-light");
                        });
                        finishStackDivs[i].addEventListener("dragleave", function (evt) {
                            evt.stopPropagation();
                            if (this === evt.target)
                                this.classList.remove("high-light");
                        }, true);
                        finishStackDivs[i].addEventListener("drop", function () {
                            rThis._dropCardCallback(this, draggedCardDiv, draggedStackDiv);
                        });
                    }
                    for (var i = 0; i < this.coveredStacks.length; i++)
                        coveredStackDivs[i].addEventListener("drop", function () {
                            rThis._dropCardCallback(this, draggedCardDiv, draggedStackDiv);
                        });
                };
                Klondike.prototype.dbClickCard = function () {
                    var rThis = this;
                    var abanCardPileDiv = document.getElementById(this._bindings["abanCardPileID"]);
                    var coveredStackDivs = document.getElementsByClassName(this._bindings["coveredStackClass"]);
                    var dblClkdCardDiv;
                    var dblClkdStackDiv;
                    function listener() {
                        rThis._dropCardCallback(this.lastChild, dblClkdCardDiv, dblClkdStackDiv);
                    }
                    abanCardPileDiv.addEventListener("dblclick", listener);
                    for (var i = 0; i < coveredStackDivs.length; i++)
                        coveredStackDivs[i].addEventListener("dblclick", listener);
                };
                ;
                Klondike.prototype.hint = function () {
                    var rThis = this;
                    document.addEventListener("keydown", function (evt) {
                        if (evt.keyCode === 72) {
                        }
                    });
                };
                Klondike.prototype.solve = function () {
                    var rThis = this;
                    document.getElementById(this._bindings["solveID"]).addEventListener("click", function () {
                    });
                };
                Klondike.prototype.redeal = function () {
                    var rThis = this;
                    document.getElementById(this._bindings["redealID"]).addEventListener("click", function () {
                    });
                };
                Klondike.prototype.recall = function () {
                    var rThis = this;
                    document.getElementById(this._bindings["recallID"]).addEventListener("click", function () {
                        recallCallback();
                    });
                    document.addEventListener("keydown", function (evt) {
                        if (evt.keyCode === 90 && evt.ctrlKey) {
                            recallCallback();
                        }
                    });
                    function recallCallback() {
                    }
                };
                return Klondike;
            }());
            exports_1("Klondike", Klondike);
        }
    };
});
//# sourceMappingURL=main.js.map