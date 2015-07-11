if(typeof exports === 'undefined') {
  exports = window;
}

// data from http://tofus.fr/fiches/idoles.php

var nonFamilies = [
{name: 'Nyan',     score: 10, level: 100, group: false, ineligible: ['Korriander']},
{name: 'Ougaa',    score: 15, level: 50,  group: false, ineligible: ['Merkator']},
{name: 'Proxima',  score: 15, level: 30,  group: false, ineligible: ['Merkator']},
{name: 'Corrode',  score: 20, level: 127, group: false, ineligible: ['Tynril']},
{name: 'Critus',   score: 20, level: 140, group: false, ineligible: []},
{name: 'Aroumb',   score: 25, level: 80,  group: false, ineligible: ['Protozooreur']},
{name: 'Muta',     score: 30, level: 60,  group: false, ineligible: ['Merkator']},
{name: 'Djim',     score: 40, level: 161, group: false, ineligible: ['Royal Mastogob', 'Protozoorreur']},
{name: 'Nekineko', score: 40, level: 110, group: false, ineligible: ['Giant Kralove']},
{name: 'Dakid',    score: 50, level: 90,  group: false, ineligible: ['Missiz Freeze']},
{name: 'Penitent', score: 15, level: 123, group: true,  ineligible: ['Kolosso']},
{name: 'Hoskar',   score: 20, level: 120, group: true,  ineligible: ['Nileza']},
{name: 'Korria',   score: 20, level: 163, group: true,  ineligible: []},
{name: 'Vaude',    score: 20, level: 70,  group: true,  ineligible: []},
{name: 'Binar',    score: 25, level: 170, group: true,  ineligible: []},
{name: 'Ultram',   score: 25, level: 130, group: true,  ineligible: ['Protozorreur', 'Korriander']},
{name: 'Nahuatl',  score: 50, level: 180, group: true,  ineligible: ['Sylargh', 'Protozorreur', 'Obsidemon', 'Buck Anear', 'Kimbo', 'Vortex', 'Puppet Master']},
];

function range(from, to) {
  step = (to - from) / 3;
  return [from, from + step, from + step + step, to];
}

var families = [
{name: 'Oaf',     score: range(10, 40),    level: range(25, 145),   group: false, ineligible: ['Tynril']},
{name: 'Cafra',   score: range(15, 45),    level: range(68, 188),   group: false, ineligible: ['Tynril']},
{name: 'Dynamo',  score: range(15, 45),    level: range(1, 121),    group: false, ineligible: ['Giant Kralove']},
{name: 'Horiz',   score: range(15, 45),    level: range(35, 155),   group: false, ineligible: ['Tynril']},
{name: 'Sak',     score: range(15, 45),    level: range(56, 176),   group: false, ineligible: ['Tynril']},
{name: 'Yosh',    score: [10, 25, 40, 50], level: range(15, 135),   group: false, ineligible: ['Tynril']},
{name: 'Zaihn',   score: range(5, 50),     level: range(61, 181),   group: false, ineligible: []},
{name: 'Dagob',   score: range(10, 55),    level: range(45, 165),   group: false, ineligible: []},
{name: 'Nyoro',   score: range(15, 60),    level: range(6, 126),    group: false, ineligible: []},
{name: 'Behelit', score: range(20, 65),    level: [4, 44, 74, 114], group: false, ineligible: ['Tynril']},
{name: 'Kyoub',   score: [5, 10, 20, 80],  level: range(22, 142),   group: false, ineligible: ['Protozorreur']},
{name: 'Domo',    score: range(5, 35),     level: range(17, 137),   group: true, ineligible: []},
{name: 'Petunia', score: range(5, 35),     level: range(13, 133),   group: true, ineligible: []},
{name: 'Hulhu',   score: range(10, 40),    level: range(32, 152),   group: true, ineligible: []},
{name: 'Pikmi',   score: range(10, 40),    level: range(37, 157),   group: true, ineligible: []},
{name: 'Teleb',   score: range(10, 40),    level: range(51, 171),   group: true, ineligible: ['Tynril']},
{name: 'Boble',   score: range(10, 55),    level: range(48, 168),   group: true, ineligible: ['Tynril']},
{name: 'Payo',    score: range(10, 55),    level: range(23, 143),   group: true, ineligible: []},
];

var grades = ['Minor ', '', 'Major ', 'Great '];

var allIdols = families.reduce(function(familyIdols, family) {
  return familyIdols.concat(grades.map(function(grade, index) {
    return {
      name: grade + family.name,
      score: family.score[index],
      level: family.level[index],
      group: family.group,
      ineligible: family.ineligible,
    };
  }));
}, nonFamilies);
exports.allIdols = allIdols;

var idolNamed = {};
allIdols.forEach(function(idol) {
  idolNamed[idol.name] = idol;
});
exports.idolNamed = idolNamed;

function isMember(element, set) {
  return set.indexOf(element) >= 0;
}

var dungeons = [];
allIdols.forEach(function(idol) {
  idol.ineligible.forEach(function(dungeon) {
    if(!isMember(dungeon, dungeons)) {
      dungeons.push(dungeon);
    }
  });
}, []);
exports.dungeons = dungeons;

function makeIdolVariables(namespace) {
  allIdols.forEach(function(idol) {
    namespace[idol.name.replace(' ', '')] = idol;
  });
}
exports.makeIdolVariables = makeIdolVariables;

makeIdolVariables(this);

// put the alphabetically first idol as the first in the pair
var synergies = [
{idols: [Aroumb,       Muta         ], value: 1.82},
{idols: [Binar,        Muta         ], value: 1.34},
{idols: [Corrode,      Nyoro        ], value: 1.22},
{idols: [Corrode,      Penitent     ], value: 0.69},
{idols: [Dakid,        GreatBehelit ], value: 1.11},
{idols: [Dakid,        GreatDagob   ], value: 1.11},
{idols: [Dakid,        GreatDynamo  ], value: 1.14},
{idols: [Dakid,        GreatHoriz   ], value: 1.11},
{idols: [Dakid,        GreatOaf     ], value: 1.13},
{idols: [Dakid,        GreatSak     ], value: 1.11},
{idols: [Dakid,        Muta         ], value: 1.26},
{idols: [Dakid,        Nekineko     ], value: 1.33},
{idols: [Dakid,        Proxima      ], value: 1.10},
{idols: [GreatBehelit, GreatDynamo  ], value: 1.17},
{idols: [GreatBehelit, GreatHulhu   ], value: 1.11},
{idols: [GreatBehelit, GreatPayo    ], value: 1.10},
{idols: [GreatBehelit, Nekineko     ], value: 1.09},
{idols: [GreatBoble,   GreatHulhu   ], value: 1.27},
{idols: [GreatBoble,   MajorBoble   ], value: 0.74},
{idols: [GreatDagob,   GreatHulhu   ], value: 1.14},
{idols: [GreatDagob,   GreatPayo    ], value: 1.13},
{idols: [GreatDagob,   MajorDagob   ], value: 0.71},
{idols: [GreatDagob,   Nekineko     ], value: 1.11},
{idols: [GreatDynamo,  GreatDagob   ], value: 1.20},
{idols: [GreatDynamo,  GreatHoriz   ], value: 1.20},
{idols: [GreatDynamo,  GreatHulhu   ], value: 0.81},
{idols: [GreatDynamo,  GreatOaf     ], value: 1.22},
{idols: [GreatDynamo,  GreatSak     ], value: 1.20},
{idols: [GreatDynamo,  GreatTeleb   ], value: 1.17},
{idols: [GreatDynamo,  GreatYosh    ], value: 1.12},
{idols: [GreatDynamo,  Nekineko     ], value: 0.70},
{idols: [GreatDynamo,  Ougaa        ], value: 1.12},
{idols: [GreatDynamo,  Penitent     ], value: 1.19},
{idols: [GreatHoriz,   GreatHulhu   ], value: 1.14},
{idols: [GreatHoriz,   GreatOaf     ], value: 0.78},
{idols: [GreatHoriz,   GreatPayo    ], value: 1.13},
{idols: [GreatHoriz,   Muta         ], value: 0.75},
{idols: [GreatHoriz,   Nekineko     ], value: 1.11},
{idols: [GreatHoriz,   Ougaa        ], value: 1.08},
{idols: [GreatHulhu,   GreatSak     ], value: 1.14},
{idols: [GreatHulhu,   GreatTeleb   ], value: 1.18},
{idols: [GreatHulhu,   GreatYosh    ], value: 1.10},
{idols: [GreatHulhu,   MajorHulhu   ], value: 0.83},
{idols: [GreatHulhu,   Nekineko     ], value: 0.88},
{idols: [GreatHulhu,   Penitent     ], value: 1.09},
{idols: [GreatHulhu,   Ultram       ], value: 1.11},
{idols: [GreatKyoub,   GreatOaf     ], value: 1.19},
{idols: [GreatKyoub,   GreatTeleb   ], value: 1.19},
{idols: [GreatKyoub,   Ultram       ], value: 1.15},
{idols: [GreatKyoub,   GreatYosh    ], value: 0.64},
{idols: [GreatKyoub,   MajorKyoub   ], value: 0.75},
{idols: [GreatNyoro,   MajorNyoro   ], value: 0.86},
{idols: [GreatNyoro,   Penitent     ], value: 1.23},
{idols: [GreatOaf,     GreatPayo    ], value: 1.14},
{idols: [GreatOaf,     Muta         ], value: 1.29},
{idols: [GreatOaf,     Nekineko     ], value: 1.13},
{idols: [GreatOaf,     Ougaa        ], value: 0.91},
{idols: [GreatPayo,    GreatSak     ], value: 1.13},
{idols: [GreatPayo,    Penitent     ], value: 1.15},
{idols: [GreatPayo,    Ultram       ], value: 1.20},
{idols: [GreatPikmi,   Muta         ], value: 1.21},
{idols: [GreatSak,     MajorSak     ], value: 0.71},
{idols: [GreatSak,     Nekineko     ], value: 1.11},
{idols: [GreatYosh,    MajorYosh    ], value: 0.74},
{idols: [GreatYosh,    Nekineko     ], value: 1.11},
{idols: [Hoskar,       Muta         ], value: 1.50},
{idols: [MajorBehelit, MajorDynamo  ], value: 1.17},
{idols: [MajorDynamo,  MinorOaf     ], value: 1.32},
{idols: [MajorDynamo,  MinorDagob   ], value: 1.35},
{idols: [Muta,         Ougaa        ], value: 1.67},
{idols: [Muta,         Proxima      ], value: 1.44},
{idols: [Muta,         Ultram       ], value: 1.82},
{idols: [Nekineko,     GreatTeleb   ], value: 1.16},
{idols: [Nekineko,     Ougaa        ], value: 1.14},
{idols: [Nekineko,     Penitent     ], value: 1.19},
{idols: [Nekineko,     Ultram       ], value: 1.20},
{idols: [Proxima,      Ougaa        ], value: 0.67},
];

function isSubset(smallerSet, biggerSet) {
  return smallerSet.every(function(element) {
    return isMember(element, biggerSet);
  });
}

function totalScore(idols, usedSynergy) {
  var names = [];
  var scores = {};
  idols.forEach(function(idol, index) {
    names.push(idol.name);
    scores[idol.name] = idol.score;
  });
  synergies.forEach(function(synergy) {
    if(isSubset(synergy.idols, names)) {
      if(usedSynergy) {
        usedSynergy(synergy);
      }
      synergy.idols.forEach(function(name) {
        scores[name] *= synergy.value;
      });
    }
  });
  return names.reduce(function(sum, name) {
    return sum + Math.floor(scores[name]);
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

// from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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

