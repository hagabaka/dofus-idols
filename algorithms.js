define(['synergies', 'utilities'],
  function(synergies, utilities) {
  var exports = {};

  function totalScore(idols, usedSynergy) {
    var scores = {};
    idols.forEach(function(idol) {
      scores[idol.name] = idol.score;
    });
    if(idols.length === 0) {
      return 0;
    } else if(idols.length === 1) {
      return idols[0].score;
    }
    utilities.eachCombination(idols, 2, function(pair) {
      var synergy = synergies.between(pair[0], pair[1]);
      if(synergy) {
        pair.forEach(function(idol) {
          scores[idol.name] *= synergy.value;
        });
        if(usedSynergy) {
          usedSynergy(synergy);
        }
      }
    });
    return idols.reduce(function(sum, idol) {
      return sum + Math.floor(scores[idol.name]);
    }, 0);
  }
  exports.totalScore = totalScore;

  var maximumIdols = 6;
  function findIdolCombinations(candidates, minimumScore, found, currentCombination) {
    if(!currentCombination) {
      currentCombination = [];
    }
    if(currentCombination.length < maximumIdols) {
      candidates = candidates.filter(function(idol) {
        return !utilities.isMember(idol, currentCombination);
      });
      candidates.forEach(function(idol) {
        var trialCombination = currentCombination.concat(idol);
        if(totalScore(trialCombination) >= minimumScore) {
          found(trialCombination);
        }
        findIdolCombinations(candidates, minimumScore, found, trialCombination);
      });
    }
  }
  exports.findIdolCombinations = findIdolCombinations;

  function randomCombination(candidates) {
    return utilities.shuffle(candidates).slice(0, 6);
  }
  exports.randomCombination = randomCombination;

  function guessBestCombination(candidates, startCombination) {
    if(!startCombination) {
      startCombination = randomCombination(candidates);
    }
    var bestCombination = startCombination;

    candidates.filter(function(idol) {
      return !utilities.isMember(idol, startCombination);
    }).forEach(function(idol) {
      startCombination.forEach(function(_, index) {
        var replacementCombination = startCombination.slice();
        replacementCombination[index] = idol;
        if(totalScore(replacementCombination) > totalScore(bestCombination)) {
          bestCombination = replacementCombination;
        }
      });
    });

    return bestCombination;
  }
  exports.guessBestCombination = guessBestCombination;

  var stop = 'stop';
  function findBestCombination(candidates, progress) {
    var count = 0;
    var bestCombination = [];
    var bestScore = 0;
    var total = utilities.combinationCount(candidates.length, 6);
    utilities.eachCombination(candidates, 6, function(combination) {
      var score = totalScore(combination);
      if(score > bestScore) {
        bestCombination = combination;
        bestScore = score;
      }
      count++;
      if(progress(count, total, bestCombination, bestScore) === stop) {
        return bestCombination;
      }
    });
    return bestCombination;
  }
  findBestCombination.stop = stop;
  exports.findBestCombination = findBestCombination;

  function printCombination(combination) {
    var idols = combination.map(function(idol) {
      return idol.name;
    });
    console.log(idols.join(', '));
    console.log(totalScore(combination, function(synergy) {
      console.log(synergy.idols.join(' + '), ': ', synergy.value);
    }));
  }
  exports.printCombination = printCombination;

  return exports;
});
