define([], function() {
  var exports = {};

  function HashTable(initialElements, hashFunction) {
    var elements = [];

    // Array of elements
    this.elements = function() {
      return elements;
    };

    // Add the given element to the hashTable, if not already included
    this.push = function push(element) {
      if(!this.include(element)) {
        this[hashFunction(element)] = element;
        elements.push(element);
      }
    };

    // Whether the hashTable contains an element with identical hash as given element
    this.include = function(element) {
      return hashFunction(element) in this;
    };

    // Return the first element in the hashTable with identical hash as the given element
    this.lookup = function(element) {
      return this[hashFunction(element)];
    };

    var self = this;
    initialElements.forEach(function(element) {
      self.push(element);
    });
  }
  exports.HashTable = HashTable;

  function range(from, to) {
    step = (to - from) / 3;
    return [from, from + step, from + step + step, to];
  }
  exports.range = range;

  function isMember(element, set) {
    return set.indexOf(element) >= 0;
  }
  exports.isMember = isMember;

  function isSubset(smallerSet, biggerSet) {
    return smallerSet.every(function(element) {
      return isMember(element, biggerSet);
    });
  }
  exports.isSubset = isSubset;

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
  exports.shuffle = shuffle;

  // based on https://en.wikipedia.org/wiki/Binomial_coefficient#Binomial_coefficient_in_programming_languages
  function combinationCount(n, k) {
    if(k < 0 || k > n) {
      return 0;
    }
    if(k == 0 || k == n) {
      return 1;
    }
    k = Math.min(k, n - k); // take advantage of symmetry
    var c = 1;
    for(var i = 0; i < k; i++) {
      c = c * (n - i) / (i + 1);
    }
    return c;
  }
  exports.combinationCount = combinationCount;

  // based on http://rosettacode.org/wiki/Combinations#JavaScript
  function eachCombination(array, k, yieldCombination) {
    array.forEach(function(element, index) {
      if(k === 1) {
        yieldCombination([element]);
      } else {
        eachCombination(array.slice(index + 1, array.length), k - 1,
        function(subCombination) {
          yieldCombination([element].concat(subCombination));
        });
      }
    });
  }
  exports.eachCombination = eachCombination;

  return exports;
});
