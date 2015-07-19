define(['idols', 'synergies', 'algorithms'],
  function(idols, defineSynergies, defineAlgorithms) {
    var synergies = defineSynergies(idols);
    return {
      idols: idols,
      synergies: synergies,
      algorithms: defineAlgorithms(synergies)
    };
  }
);
