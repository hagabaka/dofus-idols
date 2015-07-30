define(['move'], function(move) {
  return function(model, ko, $) {
    model.idols.forEach(function(idol) {
      idol.elementInMenu = ko.observable();
      idol.elementInCombination = ko.observable();
      idol.moveDirection = ko.observable();
      idol.moveVector = ko.pureComputed(function() {
        if(! (idol.moveDirection() && idol.elementInCombination() && idol.elementInMenu()) ) {
          return null;
        }
        var vector = {idol: idol};
        if(idol.moveDirection() === 'Menu') {
          vector.origin = idol.elementInCombination();
          vector.target = idol.elementInMenu();
        } else {
          vector.origin = idol.elementInMenu();
          vector.target = idol.elementInCombination();
        }
        return vector;
      });
      idol.moveVector.subscribe(function(vector) {
        if(vector) {
          console.log('playing animation', vector);
          var destination = $(vector.target).position();
          move(vector.origin).to(destination.x, destination.y);
          idol.elementInMenu(null);
          idol.elementInCombination(null);
          idol.moveDirection(null);
        }
      });
    });

    this.addIdolToMenu = function(element, index, idol) {
      if(element.nodeType === 1) {
        idol.elementInMenu(element);
      }
    };
    this.removeIdolFromMenu = function(element, index, idol) {
      if(element.nodeType === 1) {
        idol.elementInMenu(element);
      }
    };
    this.addIdolToCombination = function(element, index, idol) {
      if(element.nodeType === 1) {
        idol.elementInCombination(element);
        idol.moveDirection('Combination');
      }
    };
    this.removeIdolFromCombination = function(element, index, idol) {
      if(element.nodeType === 1) {
        idol.elementInCombination(element);
        idol.moveDirection('Menu');
      }
    };
  };
});

