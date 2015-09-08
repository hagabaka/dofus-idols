define(['model/idolData', 'utilities'], function(idols, utilities) {
  var exports = idols;

  idols.forEach(function(idol) {
    idol.synergiesWithOtherIdols = [];
  });
  idols.addSynergy = function(idol1, idol2, synergy) {
    idol1.synergiesWithOtherIdols.push({
      idol: idol2,
      synergy: synergy
    });
    idol2.synergiesWithOtherIdols.push({
      idol: idol1,
      synergy: synergy
    });
  };

  var idolNamed = {};
  idols.forEach(function(idol) {
    idolNamed[idol.name] = idol;
  });
  exports.idolNamed = idolNamed;

  var dungeons = [];
  idols.forEach(function(idol) {
    idol.ineligible.forEach(function(dungeon) {
      if(!utilities.isMember(dungeon, dungeons)) {
        dungeons.push(dungeon);
      }
    });
  }, []);
  exports.dungeons = dungeons;

  function makeIdolVariables(namespace) {
    idols.forEach(function(idol) {
      namespace[idol.name.replace(' ', '')] = idol;
    });
  }
  exports.makeIdolVariables = makeIdolVariables;

  return exports;
});

