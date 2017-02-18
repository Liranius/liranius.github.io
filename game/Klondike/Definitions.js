System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function shuffle(arr) {
        for (var i = arr.length; i;) {
            var j = void 0, x = void 0;
            j = Math.floor(Math.random() * i);
            x = arr[--i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    }
    var createCardStack, suits, cards, PokerCard, createDeck, createCoveredStacks, createFinishStacks;
    return {
        setters: [],
        execute: function () {
            createCardStack = function (length) {
                return new Array(length);
            };
            exports_1("suits", suits = ["♠", "♥", "♣", "♦"]);
            exports_1("cards", cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]);
            PokerCard = (function () {
                function PokerCard() {
                    var _this = this;
                    this._status = false;
                    this.setCardElement = function () {
                        _this.cardElement = document.createElement("div");
                        _this.cardElement.className = "poker-card";
                        _this.cardElement.innerHTML =
                            "<div class=\"card-wrapper " + ((_this._suit % 2) ? "card-red" : "card-black") + " hide\">\n                <p>" + cards[_this._card] + "</p>\n                <h1>" + suits[_this._suit] + "</h1>\n                <h1>" + suits[_this._suit] + "</h1>\n                <p>" + cards[_this._card] + "</p>\n            </div>";
                    };
                }
                Object.defineProperty(PokerCard.prototype, "suit", {
                    get: function () {
                        return this._suit;
                    },
                    set: function (newSuit) {
                        try {
                            if (this._suit === undefined)
                                this._suit = newSuit;
                            else
                                throw "Suit value has been set.";
                        }
                        catch (e) {
                            console.log(e);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PokerCard.prototype, "card", {
                    get: function () {
                        return this._card;
                    },
                    set: function (newCard) {
                        try {
                            if (this._card === undefined)
                                this._card = newCard;
                            else
                                throw "Card value has been set.";
                        }
                        catch (e) {
                            console.log(e);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PokerCard.prototype, "status", {
                    get: function () {
                        return this._status;
                    },
                    set: function (newStatus) {
                        this._status = newStatus;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PokerCard;
            }());
            exports_1("PokerCard", PokerCard);
            exports_1("createDeck", createDeck = function () {
                var deck = new Array(suits.length * cards.length);
                for (var i = 0; i < deck.length; i++) {
                    deck[i] = new PokerCard();
                    deck[i].suit = Math.floor(i % deck.length / cards.length);
                    deck[i].card = i % deck.length % cards.length;
                    deck[i].setCardElement();
                }
                return shuffle(deck);
            });
            exports_1("createCoveredStacks", createCoveredStacks = function (length) {
                var stack = new Array(length);
                for (var i = 0; i < length; i++) {
                    stack[i] = createCardStack(i + 1);
                }
                return stack;
            });
            exports_1("createFinishStacks", createFinishStacks = function () {
                var stack = new Array(suits.length);
                for (var i = 0; i < stack.length; i++) {
                    stack[i] = createCardStack(0);
                }
                return stack;
            });
        }
    };
});
//# sourceMappingURL=Definitions.js.map