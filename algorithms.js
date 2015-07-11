function totalScore(idols, usedSynergy) {
  var scores = {};
  idols.forEach(function(idol) {
    scores[idol.name] = idol.score;
  });
  synergies.forEach(function(synergy) {
    if(isSubset(synergy.idols, idols)) {
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
      return !isMember(idol, currentCombination);
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

/*
makeIdolVariables(global);
console.log(totalScore([MajorDynamo, MajorBehelit]));
console.log(totalScore([MajorDynamo, MajorBehelit, MinorZaihn]));
console.log(totalScore([MajorDynamo, MajorBehelit, Aroumb]));
console.log(totalScore([MajorDynamo, MajorBehelit, MinorDagob]));
*/
/*
The above should print
98
103
123
126
*/

var greatIdols = allIdols.filter(function(idol) {
  return isMember(idol, nonFamilies) || /^Great /.test(idol.name);
});
exports.greatIdols = greatIdols;

var synergeticIdols = allIdols.filter(function(idol) {
  return synergies.some(function(synergy) {
    return isMember(idol.name, synergy.idols);
  });
});
exports.synergeticIdols = synergeticIdols;

exports.find300 = function() {
  findIdolCombinations(shuffle(synergeticIdols), 300, function(combination) {
    printCombination(combination);
  });
};

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

