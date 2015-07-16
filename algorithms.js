define(['synergies', 'utilities'], function(synergies, utilities) {
  var exports = {};

  function totalScore(idols, usedSynergy) {
    var scores = {};
    idols.forEach(function(idol) {
      scores[idol.name] = idol.score;
    });
    synergies.forEach(function(synergy) {
      if(utilities.isSubset(synergy.idols, idols)) {
        if(usedSynergy) {
          usedSynergy(synergy);
        }
        synergy.idols.forEach(function(idol) {
          scores[idol.name] *= synergy.value;
        });
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
