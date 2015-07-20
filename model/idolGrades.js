define(['model/idols', 'lazy'], function(idols, Lazy) {
  var idolGrades = {
    Minor   : 0,
    Regular : 1,
    Major   : 2,
    Great   : 3,
  };

  var families = Lazy([]);
  var remainingIdols = [];

  idols.forEach(function(idol) {
    var name = idol.name;
    if(families.contains(name)) {
      idol.grade = idolGrades.Regular;
    } else {
      var match = /^(Minor|Major|Great) (.+)$/.exec(idol.name);
      if(match) {
        idol.grade = idolGrades[match[1]];
        families = families.union([match[2]]);
      } else {
        remainingIdols.push(idol);
      }
    }
  });
  remainingIdols.forEach(function(idol) {
    if(families.contains(name)) {
      idol.grade = idolGrades.Regular;
    } else {
      idol.grade = idolGrades.Great;
    }
  });

  return idolGrades;
});

