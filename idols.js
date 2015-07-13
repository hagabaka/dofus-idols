define(['idolData', 'utilities'], function(idols, utilities) {
  var exports = idols;

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

