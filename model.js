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
{name: 'Vood',    score: 20, level: 70,  group: true,  ineligible: []},
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
{name: 'Rocha',   score: range(15, 45),    level: range(68, 188),   group: false, ineligible: ['Tynril']},
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
{idols: [Dakid,        Dynamo       ], value: 1.20},
{idols: [Dakid,        GreatBehelit ], value: 1.11},
{idols: [Dakid,        GreatDagob   ], value: 1.11},
{idols: [Dakid,        GreatDynamo  ], value: 1.14},
{idols: [Dakid,        GreatHoriz   ], value: 1.11},
{idols: [Dakid,        GreatOaf     ], value: 1.13},
{idols: [Dakid,        GreatSak     ], value: 1.11},
{idols: [Dakid,        MajorDynamo  ], value: 1.17},
{idols: [Dakid,        MinorDagob   ], value: 1.24},
{idols: [Dakid,        MinorDynamo  ], value: 1.25},
{idols: [Dakid,        Muta         ], value: 1.26},
{idols: [Dakid,        Nekineko     ], value: 1.33},
{idols: [Dakid,        Proxima      ], value: 1.10},
{idols: [Dynamo,       MinorDagob   ], value: 1.33},
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
{idols: [GreatDynamo,  MinorDagob   ], value: 1.36},
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
{idols: [MinorDagob,   MinorDynamo  ], value: 1.29},
{idols: [Muta,         Ougaa        ], value: 1.67},
{idols: [Muta,         Proxima      ], value: 1.44},
{idols: [Muta,         Ultram       ], value: 1.82},
{idols: [Nekineko,     GreatTeleb   ], value: 1.16},
{idols: [Nekineko,     Ougaa        ], value: 1.14},
{idols: [Nekineko,     Penitent     ], value: 1.19},
{idols: [Nekineko,     Ultram       ], value: 1.20},
{idols: [Proxima,      Ougaa        ], value: 0.67},

// Thanks to Deimos for providing these

{idols: [Korria, Nyan], value: 0.7},
{idols: [Proxima, Ougaa], value: 0.67},
{idols: [Muta, Ougaa], value: 1.67},
{idols: [Nekineko, Ougaa], value: 1.14},
{idols: [MinorOaf, Ougaa], value: 0.8},
{idols: [Oaf, Ougaa], value: 0.86},
{idols: [MajorOaf, Ougaa], value: 0.89},
{idols: [GreatOaf, Ougaa], value: 0.91},
{idols: [MinorDynamo, Ougaa], value: 1.27},
{idols: [Dynamo, Ougaa], value: 1.19},
{idols: [MajorDynamo, Ougaa], value: 1.14},
{idols: [GreatDynamo, Ougaa], value: 1.12},
{idols: [MinorHoriz, Ougaa], value: 1.18},
{idols: [Horiz, Ougaa], value: 1.13},
{idols: [MajorHoriz, Ougaa], value: 1.1},
{idols: [GreatHoriz, Ougaa], value: 1.08},
{idols: [Muta, Proxima], value: 1.44},
{idols: [Dakid, Proxima], value: 1.1},
{idols: [Penitent, Corrode], value: 0.69},
{idols: [MinorNyoro, Corrode], value: 1.25},
{idols: [Nyoro, Corrode], value: 1.24},
{idols: [MajorNyoro, Corrode], value: 1.23},
{idols: [GreatNyoro, Corrode], value: 1.22},
{idols: [Muta, Aroumb], value: 1.82},
{idols: [Dakid, Muta], value: 1.26},
{idols: [Penitent, Muta], value: 1.33},
{idols: [Hoskar, Muta], value: 1.5},
{idols: [Binar, Muta], value: 1.36},
{idols: [Ultram, Muta], value: 1.82},
{idols: [MinorOaf, Muta], value: 1.13},
{idols: [Oaf, Muta], value: 1.2},
{idols: [MajorOaf, Muta], value: 1.25},
{idols: [GreatOaf, Muta], value: 1.29},
{idols: [MinorHoriz, Muta], value: 0.88},
{idols: [Horiz, Muta], value: 0.82},
{idols: [MajorHoriz, Muta], value: 0.78},
{idols: [GreatHoriz, Muta], value: 0.75},
{idols: [MinorPikmi, Muta], value: 1.38},
{idols: [Pikmi, Muta], value: 1.3},
{idols: [MajorPikmi, Muta], value: 1.25},
{idols: [GreatPikmi, Muta], value: 1.21},
{idols: [Dakid, Nekineko], value: 1.33},
{idols: [Penitent, Nekineko], value: 1.19},
{idols: [Ultram, Nekineko], value: 1.2},
{idols: [MinorOaf, Nekineko], value: 1.21},
{idols: [Oaf, Nekineko], value: 1.17},
{idols: [MajorOaf, Nekineko], value: 1.15},
{idols: [GreatOaf, Nekineko], value: 1.13},
{idols: [MinorDynamo, Nekineko], value: 0.7},
{idols: [Dynamo, Nekineko], value: 0.7},
{idols: [MajorDynamo, Nekineko], value: 0.7},
{idols: [GreatDynamo, Nekineko], value: 0.7},
{idols: [MinorHoriz, Nekineko], value: 1.2},
{idols: [Horiz, Nekineko], value: 1.16},
{idols: [MajorHoriz, Nekineko], value: 1.13},
{idols: [GreatHoriz, Nekineko], value: 1.11},
{idols: [MinorSak, Nekineko], value: 1.2},
{idols: [Sak, Nekineko], value: 1.16},
{idols: [MajorSak, Nekineko], value: 1.13},
{idols: [GreatSak, Nekineko], value: 1.11},
{idols: [MinorYosh, Nekineko], value: 1.05},
{idols: [Yosh, Nekineko], value: 1.08},
{idols: [MajorYosh, Nekineko], value: 1.1},
{idols: [GreatYosh, Nekineko], value: 1.11},
{idols: [MinorDagob, Nekineko], value: 1.24},
{idols: [Dagob, Nekineko], value: 1.17},
{idols: [MajorDagob, Nekineko], value: 1.14},
{idols: [GreatDagob, Nekineko], value: 1.11},
{idols: [MinorBehelit, Nekineko], value: 1.18},
{idols: [Behelit, Nekineko], value: 1.14},
{idols: [MajorBehelit, Nekineko], value: 1.11},
{idols: [GreatBehelit, Nekineko], value: 1.09},
{idols: [MinorHulhu, Nekineko], value: 0.94},
{idols: [Hulhu, Nekineko], value: 0.91},
{idols: [MajorHulhu, Nekineko], value: 0.89},
{idols: [GreatHulhu, Nekineko], value: 0.88},
{idols: [MinorTeleb, Nekineko], value: 1.11},
{idols: [Teleb, Nekineko], value: 1.13},
{idols: [MajorTeleb, Nekineko], value: 1.11},
{idols: [MinorOaf, Dakid], value: 1.21},
{idols: [Oaf, Dakid], value: 1.17},
{idols: [MajorOaf, Dakid], value: 1.15},
{idols: [GreatOaf, Dakid], value: 1.13},
{idols: [MinorDynamo, Dakid], value: 1.24},
{idols: [Dynamo, Dakid], value: 1.2},
{idols: [MajorDynamo, Dakid], value: 1.17},
{idols: [GreatDynamo, Dakid], value: 1.14},
{idols: [MinorHoriz, Dakid], value: 1.2},
{idols: [Horiz, Dakid], value: 1.16},
{idols: [MajorHoriz, Dakid], value: 1.13},
{idols: [GreatHoriz, Dakid], value: 1.11},
{idols: [MinorSak, Dakid], value: 1.2},
{idols: [Sak, Dakid], value: 1.16},
{idols: [MajorSak, Dakid], value: 1.13},
{idols: [GreatSak, Dakid], value: 1.11},
{idols: [MinorDagob, Dakid], value: 1.24},
{idols: [Dagob, Dakid], value: 1.17},
{idols: [MajorDagob, Dakid], value: 1.14},
{idols: [GreatDagob, Dakid], value: 1.11},
{idols: [MinorBehelit, Dakid], value: 1.18},
{idols: [Behelit, Dakid], value: 1.14},
{idols: [MajorBehelit, Dakid], value: 1.11},
{idols: [GreatBehelit, Dakid], value: 1.09},
{idols: [MinorDynamo, Penitent], value: 1.18},
{idols: [Dynamo, Penitent], value: 1.19},
{idols: [MajorDynamo, Penitent], value: 1.19},
{idols: [GreatDynamo, Penitent], value: 1.19},
{idols: [MinorNyoro, Penitent], value: 1.27},
{idols: [Nyoro, Penitent], value: 1.25},
{idols: [MajorNyoro, Penitent], value: 1.24},
{idols: [GreatNyoro, Penitent], value: 1.23},
{idols: [MinorHulhu, Penitent], value: 1.25},
{idols: [Hulhu, Penitent], value: 1.15},
{idols: [MajorHulhu, Penitent], value: 1.11},
{idols: [GreatHulhu, Penitent], value: 1.09},
{idols: [MinorPayo, Penitent], value: 1.18},
{idols: [Payo, Penitent], value: 1.13},
{idols: [MajorPayo, Penitent], value: 1.14},
{idols: [GreatPayo, Penitent], value: 1.15},
{idols: [MinorDynamo, Ultram], value: 1.2},
{idols: [Dynamo, Ultram], value: 1.29},
{idols: [MajorDynamo, Ultram], value: 1.26},
{idols: [GreatDynamo, Ultram], value: 1.25},
{idols: [MinorKyoub, Ultram], value: 1.33},
{idols: [Kyoub, Ultram], value: 1.29},
{idols: [MajorKyoub, Ultram], value: 1.22},
{idols: [GreatKyoub, Ultram], value: 1.15},
{idols: [MinorHulhu, Ultram], value: 1.25},
{idols: [Hulhu, Ultram], value: 1.18},
{idols: [MajorHulhu, Ultram], value: 1.05},
{idols: [GreatHulhu, Ultram], value: 1.11},
{idols: [MinorPayo, Ultram], value: 1.2},
{idols: [Payo, Ultram], value: 1.2},
{idols: [MajorPayo, Ultram], value: 1.2},
{idols: [GreatPayo, Ultram], value: 1.2},
{idols: [MinorBoble, Nahuatl], value: 1.2},
{idols: [Boble, Nahuatl], value: 1.2},
{idols: [MajorBoble, Nahuatl], value: 1.29},
{idols: [GreatBoble, Nahuatl], value: 1.5},
{idols: [Oaf, MinorOaf], value: 0.83},
{idols: [MajorOaf, MinorOaf], value: 0.88},
{idols: [GreatOaf, MinorOaf], value: 0.9},
{idols: [MinorDynamo, MinorOaf], value: 1.29},
{idols: [Dynamo, MinorOaf], value: 1.29},
{idols: [MajorDynamo, MinorOaf], value: 1.32},
{idols: [GreatDynamo, MinorOaf], value: 1.33},
{idols: [MinorHoriz, MinorOaf], value: 0.78},
{idols: [Horiz, MinorOaf], value: 0.86},
{idols: [MajorHoriz, MinorOaf], value: 0.89},
{idols: [GreatHoriz, MinorOaf], value: 0.92},
{idols: [MinorKyoub, MinorOaf], value: 1.17},
{idols: [Kyoub, MinorOaf], value: 1.25},
{idols: [MajorKyoub, MinorOaf], value: 1.33},
{idols: [GreatKyoub, MinorOaf], value: 1.3},
{idols: [MinorHulhu, MinorOaf], value: 1.33},
{idols: [Hulhu, MinorOaf], value: 1.27},
{idols: [MajorHulhu, MinorOaf], value: 1.25},
{idols: [GreatHulhu, MinorOaf], value: 1.24},
{idols: [MinorPayo, MinorOaf], value: 1.22},
{idols: [Payo, MinorOaf], value: 1.21},
{idols: [MajorPayo, MinorOaf], value: 1.21},
{idols: [GreatPayo, MinorOaf], value: 1.21},
{idols: [MajorOaf, Oaf], value: 0.7},
{idols: [GreatOaf, Oaf], value: 0.75},
{idols: [MinorDynamo, Oaf], value: 1.15},
{idols: [Dynamo, Oaf], value: 1.22},
{idols: [MajorDynamo, Oaf], value: 1.26},
{idols: [GreatDynamo, Oaf], value: 1.29},
{idols: [MinorHoriz, Oaf], value: 0.69},
{idols: [Horiz, Oaf], value: 0.78},
{idols: [MajorHoriz, Oaf], value: 0.83},
{idols: [GreatHoriz, Oaf], value: 0.86},
{idols: [MinorKyoub, Oaf], value: 1.1},
{idols: [Kyoub, Oaf], value: 1.17},
{idols: [MajorKyoub, Oaf], value: 1.25},
{idols: [GreatKyoub, Oaf], value: 1.25},
{idols: [MinorHulhu, Oaf], value: 1.2},
{idols: [Hulhu, Oaf], value: 1.2},
{idols: [MajorHulhu, Oaf], value: 1.2},
{idols: [GreatHulhu, Oaf], value: 1.2},
{idols: [MinorPayo, Oaf], value: 1.15},
{idols: [Payo, Oaf], value: 1.17},
{idols: [MajorPayo, Oaf], value: 1.17},
{idols: [GreatPayo, Oaf], value: 1.18},
{idols: [GreatOaf, MajorOaf], value: 0.71},
{idols: [MinorDynamo, MajorOaf], value: 1.12},
{idols: [Dynamo, MajorOaf], value: 1.18},
{idols: [MajorDynamo, MajorOaf], value: 1.22},
{idols: [GreatDynamo, MajorOaf], value: 1.25},
{idols: [MinorHoriz, MajorOaf], value: 0.65},
{idols: [Horiz, MajorOaf], value: 0.73},
{idols: [MajorHoriz, MajorOaf], value: 0.78},
{idols: [GreatHoriz, MajorOaf], value: 0.81},
{idols: [MinorKyoub, MajorOaf], value: 1.07},
{idols: [Kyoub, MajorOaf], value: 1.13},
{idols: [MajorKyoub, MajorOaf], value: 1.2},
{idols: [GreatKyoub, MajorOaf], value: 1.21},
{idols: [MinorHulhu, MajorOaf], value: 1.14},
{idols: [Hulhu, MajorOaf], value: 1.16},
{idols: [MajorHulhu, MajorOaf], value: 1.17},
{idols: [GreatHulhu, MajorOaf], value: 1.17},
{idols: [MinorPayo, MajorOaf], value: 1.12},
{idols: [Payo, MajorOaf], value: 1.14},
{idols: [MajorPayo, MajorOaf], value: 1.15},
{idols: [GreatPayo, MajorOaf], value: 1.16},
{idols: [MinorDynamo, GreatOaf], value: 1.1},
{idols: [Dynamo, GreatOaf], value: 1.15},
{idols: [MajorDynamo, GreatOaf], value: 1.19},
{idols: [GreatDynamo, GreatOaf], value: 1.22},
{idols: [MinorHoriz, GreatOaf], value: 0.62},
{idols: [Horiz, GreatOaf], value: 0.69},
{idols: [MajorHoriz, GreatOaf], value: 0.74},
{idols: [GreatHoriz, GreatOaf], value: 0.78},
{idols: [MinorKyoub, GreatOaf], value: 1.06},
{idols: [Kyoub, GreatOaf], value: 1.1},
{idols: [MajorKyoub, GreatOaf], value: 1.17},
{idols: [GreatKyoub, GreatOaf], value: 1.19},
{idols: [MinorHulhu, GreatOaf], value: 1.11},
{idols: [Hulhu, GreatOaf], value: 1.13},
{idols: [MajorHulhu, GreatOaf], value: 1.14},
{idols: [GreatHulhu, GreatOaf], value: 1.15},
{idols: [MinorPayo, GreatOaf], value: 1.1},
{idols: [Payo, GreatOaf], value: 1.12},
{idols: [MajorPayo, GreatOaf], value: 1.13},
{idols: [GreatPayo, GreatOaf], value: 1.14},
{idols: [MinorHoriz, MinorDynamo], value: 1.2},
{idols: [Horiz, MinorDynamo], value: 1.13},
{idols: [MajorHoriz, MinorDynamo], value: 1.1},
{idols: [GreatHoriz, MinorDynamo], value: 1.08},
{idols: [MinorSak, MinorDynamo], value: 1.2},
{idols: [Sak, MinorDynamo], value: 1.13},
{idols: [MajorSak, MinorDynamo], value: 1.1},
{idols: [GreatSak, MinorDynamo], value: 1.08},
{idols: [MinorYosh, MinorDynamo], value: 1.11},
{idols: [Yosh, MinorDynamo], value: 1.13},
{idols: [MajorYosh, MinorDynamo], value: 1.14},
{idols: [GreatYosh, MinorDynamo], value: 1.15},
{idols: [MinorDagob, MinorDynamo], value: 1.29},
{idols: [Dagob, MinorDynamo], value: 1.15},
{idols: [MajorDagob, MinorDynamo], value: 1.11},
{idols: [GreatDagob, MinorDynamo], value: 1.08},
{idols: [MinorBehelit, MinorDynamo], value: 1.17},
{idols: [Behelit, MinorDynamo], value: 1.11},
{idols: [MajorBehelit, MinorDynamo], value: 1.08},
{idols: [GreatBehelit, MinorDynamo], value: 1.06},
{idols: [MinorHulhu, MinorDynamo], value: 0.9},
{idols: [Hulhu, MinorDynamo], value: 0.92},
{idols: [MajorHulhu, MinorDynamo], value: 0.94},
{idols: [GreatHulhu, MinorDynamo], value: 0.95},
{idols: [MinorHoriz, Dynamo], value: 1.27},
{idols: [Horiz, Dynamo], value: 1.2},
{idols: [MajorHoriz, Dynamo], value: 1.16},
{idols: [GreatHoriz, Dynamo], value: 1.13},
{idols: [MinorSak, Dynamo], value: 1.27},
{idols: [Sak, Dynamo], value: 1.2},
{idols: [MajorSak, Dynamo], value: 1.16},
{idols: [GreatSak, Dynamo], value: 1.13},
{idols: [MinorYosh, Dynamo], value: 1.07},
{idols: [Yosh, Dynamo], value: 1.1},
{idols: [MajorYosh, Dynamo], value: 1.12},
{idols: [GreatYosh, Dynamo], value: 1.13},
{idols: [MinorDagob, Dynamo], value: 1.33},
{idols: [Dagob, Dynamo], value: 1.22},
{idols: [MajorDagob, Dynamo], value: 1.17},
{idols: [GreatDagob, Dynamo], value: 1.13},
{idols: [MinorBehelit, Dynamo], value: 1.24},
{idols: [Behelit, Dynamo], value: 1.17},
{idols: [MajorBehelit, Dynamo], value: 1.13},
{idols: [GreatBehelit, Dynamo], value: 1.11},
{idols: [MinorHulhu, Dynamo], value: 0.9},
{idols: [Hulhu, Dynamo], value: 0.82},
{idols: [MajorHulhu, Dynamo], value: 0.86},
{idols: [GreatHulhu, Dynamo], value: 0.89},
{idols: [MinorHoriz, MajorDynamo], value: 1.3},
{idols: [Horiz, MajorDynamo], value: 1.24},
{idols: [MajorHoriz, MajorDynamo], value: 1.2},
{idols: [GreatHoriz, MajorDynamo], value: 1.17},
{idols: [MinorSak, MajorDynamo], value: 1.3},
{idols: [Sak, MajorDynamo], value: 1.24},
{idols: [MajorSak, MajorDynamo], value: 1.2},
{idols: [GreatSak, MajorDynamo], value: 1.17},
{idols: [MinorYosh, MajorDynamo], value: 1.05},
{idols: [Yosh, MajorDynamo], value: 1.08},
{idols: [MajorYosh, MajorDynamo], value: 1.1},
{idols: [GreatYosh, MajorDynamo], value: 1.11},
{idols: [MinorDagob, MajorDynamo], value: 1.35},
{idols: [Dagob, MajorDynamo], value: 1.26},
{idols: [MajorDagob, MajorDynamo], value: 1.21},
{idols: [GreatDagob, MajorDynamo], value: 1.17},
{idols: [MinorBehelit, MajorDynamo], value: 1.27},
{idols: [Behelit, MajorDynamo], value: 1.21},
{idols: [MajorBehelit, MajorDynamo], value: 1.17},
{idols: [GreatBehelit, MajorDynamo], value: 1.14},
{idols: [MinorHulhu, MajorDynamo], value: 0.9},
{idols: [Hulhu, MajorDynamo], value: 0.77},
{idols: [MajorHulhu, MajorDynamo], value: 0.81},
{idols: [GreatHulhu, MajorDynamo], value: 0.84},
{idols: [MinorHoriz, GreatDynamo], value: 1.32},
{idols: [Horiz, GreatDynamo], value: 1.27},
{idols: [MajorHoriz, GreatDynamo], value: 1.23},
{idols: [GreatHoriz, GreatDynamo], value: 1.2},
{idols: [MinorSak, GreatDynamo], value: 1.32},
{idols: [Sak, GreatDynamo], value: 1.27},
{idols: [MajorSak, GreatDynamo], value: 1.23},
{idols: [GreatSak, GreatDynamo], value: 1.2},
{idols: [MinorYosh, GreatDynamo], value: 1.04},
{idols: [Yosh, GreatDynamo], value: 1.07},
{idols: [MajorYosh, GreatDynamo], value: 1.08},
{idols: [GreatYosh, GreatDynamo], value: 1.1},
{idols: [MinorDagob, GreatDynamo], value: 1.36},
{idols: [Dagob, GreatDynamo], value: 1.29},
{idols: [MajorDagob, GreatDynamo], value: 1.24},
{idols: [GreatDagob, GreatDynamo], value: 1.2},
{idols: [MinorBehelit, GreatDynamo], value: 1.3},
{idols: [Behelit, GreatDynamo], value: 1.24},
{idols: [MajorBehelit, GreatDynamo], value: 1.2},
{idols: [GreatBehelit, GreatDynamo], value: 1.17},
{idols: [MinorHulhu, GreatDynamo], value: 0.9},
{idols: [Hulhu, GreatDynamo], value: 0.74},
{idols: [MajorHulhu, GreatDynamo], value: 0.78},
{idols: [GreatHulhu, GreatDynamo], value: 0.81},
{idols: [Horiz, MinorHoriz], value: 0.8},
{idols: [MajorHoriz, MinorHoriz], value: 0.85},
{idols: [GreatHoriz, MinorHoriz], value: 0.88},
{idols: [MinorHulhu, MinorHoriz], value: 1.29},
{idols: [Hulhu, MinorHoriz], value: 1.25},
{idols: [MajorHulhu, MinorHoriz], value: 1.24},
{idols: [GreatHulhu, MinorHoriz], value: 1.23},
{idols: [MinorPayo, MinorHoriz], value: 1.2},
{idols: [Payo, MinorHoriz], value: 1.2},
{idols: [MajorPayo, MinorHoriz], value: 1.2},
{idols: [GreatPayo, MinorHoriz], value: 1.2},
{idols: [MajorHoriz, Horiz], value: 0.72},
{idols: [GreatHoriz, Horiz], value: 0.77},
{idols: [MinorHulhu, Horiz], value: 1.17},
{idols: [Hulhu, Horiz], value: 1.18},
{idols: [MajorHulhu, Horiz], value: 1.18},
{idols: [GreatHulhu, Horiz], value: 1.19},
{idols: [MinorPayo, Horiz], value: 1.13},
{idols: [Payo, Horiz], value: 1.15},
{idols: [MajorPayo, Horiz], value: 1.16},
{idols: [GreatPayo, Horiz], value: 1.17},
{idols: [GreatHoriz, MajorHoriz], value: 0.69},
{idols: [MinorHulhu, MajorHoriz], value: 1.12},
{idols: [Hulhu, MajorHoriz], value: 1.14},
{idols: [MajorHulhu, MajorHoriz], value: 1.15},
{idols: [GreatHulhu, MajorHoriz], value: 1.16},
{idols: [MinorPayo, MajorHoriz], value: 1.1},
{idols: [Payo, MajorHoriz], value: 1.12},
{idols: [MajorPayo, MajorHoriz], value: 1.13},
{idols: [GreatPayo, MajorHoriz], value: 1.14},
{idols: [MinorHulhu, GreatHoriz], value: 1.09},
{idols: [Hulhu, GreatHoriz], value: 1.11},
{idols: [MajorHulhu, GreatHoriz], value: 1.13},
{idols: [GreatHulhu, GreatHoriz], value: 1.14},
{idols: [MinorPayo, GreatHoriz], value: 1.08},
{idols: [Payo, GreatHoriz], value: 1.1},
{idols: [MajorPayo, GreatHoriz], value: 1.11},
{idols: [GreatPayo, GreatHoriz], value: 1.13},
{idols: [Sak, MinorSak], value: 0.9},
{idols: [MajorSak, MinorSak], value: 0.9},
{idols: [GreatSak, MinorSak], value: 0.9},
{idols: [MinorHulhu, MinorSak], value: 1.29},
{idols: [Hulhu, MinorSak], value: 1.25},
{idols: [MajorHulhu, MinorSak], value: 1.24},
{idols: [GreatHulhu, MinorSak], value: 1.23},
{idols: [MinorPayo, MinorSak], value: 1.2},
{idols: [Payo, MinorSak], value: 1.2},
{idols: [MajorPayo, MinorSak], value: 1.2},
{idols: [GreatPayo, MinorSak], value: 1.2},
{idols: [MajorSak, Sak], value: 0.72},
{idols: [GreatSak, Sak], value: 0.77},
{idols: [MinorHulhu, Sak], value: 1.17},
{idols: [Hulhu, Sak], value: 1.18},
{idols: [MajorHulhu, Sak], value: 1.18},
{idols: [GreatHulhu, Sak], value: 1.19},
{idols: [MinorPayo, Sak], value: 1.13},
{idols: [Payo, Sak], value: 1.15},
{idols: [MajorPayo, Sak], value: 1.16},
{idols: [GreatPayo, Sak], value: 1.17},
{idols: [GreatSak, MajorSak], value: 0.71},
{idols: [MinorHulhu, MajorSak], value: 1.12},
{idols: [Hulhu, MajorSak], value: 1.14},
{idols: [MajorHulhu, MajorSak], value: 1.15},
{idols: [GreatHulhu, MajorSak], value: 1.16},
{idols: [MinorPayo, MajorSak], value: 1.1},
{idols: [Payo, MajorSak], value: 1.12},
{idols: [MajorPayo, MajorSak], value: 1.13},
{idols: [GreatPayo, MajorSak], value: 1.14},
{idols: [MinorHulhu, GreatSak], value: 1.09},
{idols: [Hulhu, GreatSak], value: 1.11},
{idols: [MajorHulhu, GreatSak], value: 1.13},
{idols: [GreatHulhu, GreatSak], value: 1.14},
{idols: [MinorPayo, GreatSak], value: 1.08},
{idols: [Payo, GreatSak], value: 1.1},
{idols: [MajorPayo, GreatSak], value: 1.11},
{idols: [GreatPayo, GreatSak], value: 1.13},
{idols: [Yosh, MinorYosh], value: 0.93},
{idols: [MajorYosh, MinorYosh], value: 0.9},
{idols: [GreatYosh, MinorYosh], value: 0.92},
{idols: [MinorHulhu, MinorYosh], value: 1.17},
{idols: [Hulhu, MinorYosh], value: 1.09},
{idols: [MajorHulhu, MinorYosh], value: 1.06},
{idols: [GreatHulhu, MinorYosh], value: 1.05},
{idols: [MajorYosh, Yosh], value: 0.73},
{idols: [GreatYosh, Yosh], value: 0.81},
{idols: [MinorKyoub, Yosh], value: 0.95},
{idols: [Kyoub, Yosh], value: 0.86},
{idols: [MajorKyoub, Yosh], value: 0.89},
{idols: [GreatKyoub, Yosh], value: 0.92},
{idols: [MinorHulhu, Yosh], value: 1.17},
{idols: [Hulhu, Yosh], value: 1.12},
{idols: [MajorHulhu, Yosh], value: 1.09},
{idols: [GreatHulhu, Yosh], value: 1.07},
{idols: [GreatYosh, MajorYosh], value: 0.74},
{idols: [MinorKyoub, MajorYosh], value: 0.95},
{idols: [Kyoub, MajorYosh], value: 0.8},
{idols: [MajorKyoub, MajorYosh], value: 0.83},
{idols: [GreatKyoub, MajorYosh], value: 0.88},
{idols: [MinorHulhu, MajorYosh], value: 1.17},
{idols: [Hulhu, MajorYosh], value: 1.13},
{idols: [MajorHulhu, MajorYosh], value: 1.11},
{idols: [GreatHulhu, MajorYosh], value: 1.09},
{idols: [MinorKyoub, GreatYosh], value: 0.95},
{idols: [Kyoub, GreatYosh], value: 0.77},
{idols: [MajorKyoub, GreatYosh], value: 0.8},
{idols: [GreatKyoub, GreatYosh], value: 0.84},
{idols: [MinorHulhu, GreatYosh], value: 1.17},
{idols: [Hulhu, GreatYosh], value: 1.14},
{idols: [MajorHulhu, GreatYosh], value: 1.12},
{idols: [GreatHulhu, GreatYosh], value: 1.1},
{idols: [MinorHulhu, MinorDagob], value: 1.5},
{idols: [Hulhu, MinorDagob], value: 1.33},
{idols: [MajorHulhu, MinorDagob], value: 1.29},
{idols: [GreatHulhu, MinorDagob], value: 1.26},
{idols: [MinorPayo, MinorDagob], value: 1.29},
{idols: [Payo, MinorDagob], value: 1.25},
{idols: [MajorPayo, MinorDagob], value: 1.24},
{idols: [GreatPayo, MinorDagob], value: 1.23},
{idols: [MajorDagob, Dagob], value: 0.73},
{idols: [GreatDagob, Dagob], value: 0.79},
{idols: [MinorHulhu, Dagob], value: 1.2},
{idols: [Hulhu, Dagob], value: 1.2},
{idols: [MajorHulhu, Dagob], value: 1.2},
{idols: [GreatHulhu, Dagob], value: 1.2},
{idols: [MinorPayo, Dagob], value: 1.15},
{idols: [Payo, Dagob], value: 1.17},
{idols: [MajorPayo, Dagob], value: 1.17},
{idols: [GreatPayo, Dagob], value: 1.18},
{idols: [GreatDagob, MajorDagob], value: 0.71},
{idols: [MinorHulhu, MajorDagob], value: 1.13},
{idols: [Hulhu, MajorDagob], value: 1.14},
{idols: [MajorHulhu, MajorDagob], value: 1.15},
{idols: [GreatHulhu, MajorDagob], value: 1.16},
{idols: [MinorPayo, MajorDagob], value: 1.11},
{idols: [Payo, MajorDagob], value: 1.13},
{idols: [MajorPayo, MajorDagob], value: 1.14},
{idols: [GreatPayo, MajorDagob], value: 1.15},
{idols: [MinorHulhu, GreatDagob], value: 1.09},
{idols: [Hulhu, GreatDagob], value: 1.11},
{idols: [MajorHulhu, GreatDagob], value: 1.13},
{idols: [GreatHulhu, GreatDagob], value: 1.14},
{idols: [MinorPayo, GreatDagob], value: 1.08},
{idols: [Payo, GreatDagob], value: 1.1},
{idols: [MajorPayo, GreatDagob], value: 1.11},
{idols: [GreatPayo, GreatDagob], value: 1.13},
{idols: [Nyoro, MinorNyoro], value: 0.9},
{idols: [MajorNyoro, MinorNyoro], value: 0.9},
{idols: [GreatNyoro, MinorNyoro], value: 0.9},
{idols: [MajorNyoro, Nyoro], value: 0.8},
{idols: [GreatNyoro, Nyoro], value: 0.83},
{idols: [GreatNyoro, MajorNyoro], value: 0.86},
{idols: [Behelit, MinorBehelit], value: 0.9},
{idols: [MajorBehelit, MinorBehelit], value: 0.9},
{idols: [GreatBehelit, MinorBehelit], value: 0.9},
{idols: [MinorHulhu, MinorBehelit], value: 1.22},
{idols: [Hulhu, MinorBehelit], value: 1.21},
{idols: [MajorHulhu, MinorBehelit], value: 1.21},
{idols: [GreatHulhu, MinorBehelit], value: 1.21},
{idols: [MinorPayo, MinorBehelit], value: 1.17},
{idols: [Payo, MinorBehelit], value: 1.18},
{idols: [MajorPayo, MinorBehelit], value: 1.18},
{idols: [GreatPayo, MinorBehelit], value: 1.19},
{idols: [MajorBehelit, Behelit], value: 0.74},
{idols: [GreatBehelit, Behelit], value: 0.71},
{idols: [MinorHulhu, Behelit], value: 1.13},
{idols: [Hulhu, Behelit], value: 1.14},
{idols: [MajorHulhu, Behelit], value: 1.15},
{idols: [GreatHulhu, Behelit], value: 1.16},
{idols: [MinorPayo, Behelit], value: 1.11},
{idols: [Payo, Behelit], value: 1.13},
{idols: [MajorPayo, Behelit], value: 1.14},
{idols: [GreatPayo, Behelit], value: 1.15},
{idols: [GreatBehelit, MajorBehelit], value: 0.65},
{idols: [MinorHulhu, MajorBehelit], value: 1.09},
{idols: [Hulhu, MajorBehelit], value: 1.11},
{idols: [MajorHulhu, MajorBehelit], value: 1.12},
{idols: [GreatHulhu, MajorBehelit], value: 1.13},
{idols: [MinorPayo, MajorBehelit], value: 1.08},
{idols: [Payo, MajorBehelit], value: 1.1},
{idols: [MajorPayo, MajorBehelit], value: 1.11},
{idols: [GreatPayo, MajorBehelit], value: 1.12},
{idols: [MinorHulhu, GreatBehelit], value: 1.07},
{idols: [Hulhu, GreatBehelit], value: 1.09},
{idols: [MajorHulhu, GreatBehelit], value: 1.1},
{idols: [GreatHulhu, GreatBehelit], value: 1.11},
{idols: [MinorPayo, GreatBehelit], value: 1.06},
{idols: [Payo, GreatBehelit], value: 1.08},
{idols: [MajorPayo, GreatBehelit], value: 1.09},
{idols: [GreatPayo, GreatBehelit], value: 1.1},
{idols: [Kyoub, MinorKyoub], value: 0.95},
{idols: [MajorKyoub, MinorKyoub], value: 0.95},
{idols: [GreatKyoub, MinorKyoub], value: 0.95},
{idols: [MinorTeleb, MinorKyoub], value: 1.5},
{idols: [Teleb, MinorKyoub], value: 1.3},
{idols: [MajorTeleb, MinorKyoub], value: 1.21},
{idols: [MajorKyoub, Kyoub], value: 0.83},
{idols: [GreatKyoub, Kyoub], value: 0.85},
{idols: [MinorTeleb, Kyoub], value: 1.5},
{idols: [Teleb, Kyoub], value: 1.33},
{idols: [MajorTeleb, Kyoub], value: 1.25},
{idols: [GreatKyoub, MajorKyoub], value: 0.75},
{idols: [MinorTeleb, MajorKyoub], value: 1.42},
{idols: [Teleb, MajorKyoub], value: 1.31},
{idols: [MajorTeleb, MajorKyoub], value: 1.25},
{idols: [MinorTeleb, GreatKyoub], value: 1.3},
{idols: [Teleb, GreatKyoub], value: 1.25},
{idols: [MajorTeleb, GreatKyoub], value: 1.21},
{idols: [MinorTeleb, MinorHulhu], value: 1.5},
{idols: [Teleb, MinorHulhu], value: 1.3},
{idols: [MajorTeleb, MinorHulhu], value: 1.21},
{idols: [MinorBoble, MinorHulhu], value: 1.43},
{idols: [Boble, MinorHulhu], value: 1.33},
{idols: [MajorBoble, MinorHulhu], value: 1.29},
{idols: [GreatBoble, MinorHulhu], value: 1.27},
{idols: [MajorHulhu, Hulhu], value: 0.89},
{idols: [GreatHulhu, Hulhu], value: 0.92},
{idols: [MinorTeleb, Hulhu], value: 1.36},
{idols: [Teleb, Hulhu], value: 1.27},
{idols: [MajorTeleb, Hulhu], value: 1.21},
{idols: [MinorBoble, Hulhu], value: 1.33},
{idols: [Boble, Hulhu], value: 1.29},
{idols: [MajorBoble, Hulhu], value: 1.27},
{idols: [GreatBoble, Hulhu], value: 1.26},
{idols: [GreatHulhu, MajorHulhu], value: 0.83},
{idols: [MinorTeleb, MajorHulhu], value: 1.31},
{idols: [Teleb, MajorHulhu], value: 1.25},
{idols: [MajorTeleb, MajorHulhu], value: 1.21},
{idols: [MinorBoble, MajorHulhu], value: 1.29},
{idols: [Boble, MajorHulhu], value: 1.27},
{idols: [MajorBoble, MajorHulhu], value: 1.26},
{idols: [GreatBoble, MajorHulhu], value: 1.28},
{idols: [MinorTeleb, GreatHulhu], value: 1.29},
{idols: [Teleb, GreatHulhu], value: 1.24},
{idols: [MajorTeleb, GreatHulhu], value: 1.21},
{idols: [MinorBoble, GreatHulhu], value: 1.27},
{idols: [Boble, GreatHulhu], value: 1.26},
{idols: [MajorBoble, GreatHulhu], value: 1.25},
{idols: [GreatBoble, GreatHulhu], value: 1.27},
{idols: [Boble, MinorBoble], value: 0.9},
{idols: [MajorBoble, MinorBoble], value: 0.9},
{idols: [GreatBoble, MinorBoble], value: 0.9},
{idols: [MajorBoble, Boble], value: 0.72},
{idols: [GreatBoble, Boble], value: 0.8},
{idols: [GreatBoble, MajorBoble], value: 0.74},
];

function isSubset(smallerSet, biggerSet) {
  return smallerSet.every(function(element) {
    return isMember(element, biggerSet);
  });
}

// Attach a string key to each synergy to help with searching
synergies.forEach(function(synergy) {
  synergy.guessed = false;
});

function hashSynergy(synergy) {
  return synergy.idols.map(function(idol) {
    return idol.name;
  }).sort().join('|');
}
var knownSynergies = new HashTable(synergies, hashSynergy);
var guessedSynergies = new HashTable([], hashSynergy);

// Sibling of an idol with given grade
function otherGrade(idol, grade) {
  if(isMember(idol, nonFamilies)) {
    return idol;
  } else {
    return idolNamed[ idol.name.replace(/^Minor |Major |Great |/, grade) ];
  }
}

// We are missing synergy data for most Minor to Major idols.
// Try to fill them in with Great idol data as fallback.
synergies.forEach(function(synergy) {
  grades.forEach(function(firstGrade) {
    var firstIdol = otherGrade(synergy.idols[0], firstGrade);
    grades.forEach(function(secondGrade) {
      var secondIdol = otherGrade(synergy.idols[1], secondGrade);

      // An idol can't have synergy with itself (grade sensitive)
      if(firstIdol.name !== secondIdol.name) {
        var guessedSynergy = {
          idols: [firstIdol, secondIdol],
          guessed: true,
          value: synergy.value
        };
        // Add the guessed synergy if it's not in the set of synergies
        if(!knownSynergies.include(guessedSynergy) &&
           !guessedSynergies.include(guessedSynergy)) {
          guessedSynergies.push(guessedSynergy);
        }
      }
    });
  });
});
synergies = synergies.concat(guessedSynergies.elements());
synergies = new HashTable(synergies, hashSynergy).elements();
synergies.forEach(function(synergy) {
  synergy.negative = synergy.value < 1;
});

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

