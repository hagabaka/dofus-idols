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

