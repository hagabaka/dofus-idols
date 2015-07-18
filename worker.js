importScripts('require.js');


onmessage = function(e) {
  require(['algorithms', 'idols'], function(algorithms, idols) {
    var methods = {
      findBestCombination: function(data) {
        var startingTime = Date.now();
        var timeOfLastMessage = 0;
        var candidates = data.idolNames.map(function(name) {
          return idols.idolNamed[name];
        });
        var bestCombination = [];
        algorithms.findBestCombination(candidates,
          function(index, total, bestCombination, bestScore) {
            var timeElapsed = Date.now() - startingTime;
            var workDone = index / total;
            var workRemaining = 1 - workDone;
            var speed = workDone / timeElapsed;
            var timeRemaining = timeElapsed * workRemaining / workDone;
            if(index === 1 || index === total || timeElapsed - timeOfLastMessage >= 500) {
              postMessage({
                progressValue: index,
                progressMax: total,
                bestCombination: bestCombination.map(function(idol) {
                  return idol.name;
                }),
                bestScore: bestScore,
                milisecondsElapsed: timeElapsed,
                estimatedMilisecondsRemaining: timeRemaining
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

