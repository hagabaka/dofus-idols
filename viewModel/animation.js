define(['move'], function(move) {
  return function(model, ko, $) {
    model.idols.forEach(function(idol) {
      idol.moveFrom = ko.observable();
      idol.moveTo = ko.observable();

      idol.readyToMove = ko.pureComputed(function() {
        return idol.moveFrom() && idol.moveTo();
      });

      idol.readyToMove.subscribe(function(ready) {
        if(ready) {
          var departure = $(idol.moveFrom()).offset();
          var destination = $(idol.moveTo()).offset();

          var moveX = destination.left - departure.left;
          var moveY = destination.top  - departure.top;
          var distance = Math.sqrt(moveX * moveX + moveY * moveY);
          var duration = Math.min(distance * 2, 500);

          var ghost = $('<div class="ghost">').css({
            position: 'fixed',
            border: '1px solid darkgray',
            transitionProperty: 'transform',
            transitionDuration: duration + 'ms',
            transitionTimingFunction: 'ease',
            zIndex: 100,
            width: $(idol.moveFrom()).outerWidth() + 'px',
            height: $(idol.moveFrom()).outerHeight() + 'px',

            // start state
            top: departure.top,
            left: departure.left,
            transform: 'translate(0, 0)',
          });

          $(idol.moveFrom()).detach();

          // show the new idol and remove the old one at end of animation
          ghost.on('transitionend', function() {
            console.log('transitionend');
            ghost.detach();
            idol.moveTo(null);
            idol.moveFrom(null);
          });

          // start animation
          ghost.appendTo('body');
          ghost.get(0).clientHeight; // trigger rendering and transition on WebKit
          ghost.css({
            transform: 'translate(' + moveX + 'px,' + moveY + 'px)',
          });
        }
      });
    });

    this.addIdol = function(element, index, idol) {
      if(element.nodeType === Node.ELEMENT_NODE) {
        idol.moveTo(element);
      }
    };

    this.removeIdol = function(element, index, idol) {
      if(element.nodeType === Node.ELEMENT_NODE) {
        idol.moveFrom(element);
      } else {
        $(element).detach();
      }
    };
  };
});

