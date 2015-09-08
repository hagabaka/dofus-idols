importScripts('requirejs/require.js');
importScripts('requirejs/config.js');

onmessage = function(e) {
  require(['model'], function(model) {
    var methods = {
      findBestCombination: function(data) {
        var startingTime = Date.now();
        var timeOfLastMessage = 0;
        var candidates = data.idolNames.map(function(name) {
          return model.idols.idolNamed[name];
        });
        var bestCombination = [];
        model.algorithms.findBestCombination(candidates,
          function(index, total, bestCombination, bestScore) {
            var timeElapsed = Date.now() - startingTime;
            var workDone = index / total;
            var workRemaining = 1 - workDone;
            var speed = workDone / timeElapsed;
            var timeRemaining = timeElapsed * workRemaining / workDone;
            var combinationsPerSecond = (index / (timeElapsed / 1000)).toFixed();
            if(index === 1 || index === total || timeElapsed - timeOfLastMessage >= 500) {
              postMessage({
                progressValue: index,
                progressMax: total,
                bestCombination: bestCombination.map(function(idol) {
                  return idol.name;
                }),
                bestScore: bestScore,
                milisecondsElapsed: timeElapsed,
                estimatedMilisecondsRemaining: timeRemaining,
                combinationsPerSecond: combinationsPerSecond
              });
              timeOfLastMessage = timeElapsed;
            }
          });
        postMessage({searching: false});
      }
    };

    console.log(e.data);
    if(e.data.method in methods) {
      methods[e.data.method](e.data);
    } else {
      console.log('Ignoring message');
    }
  });
};

