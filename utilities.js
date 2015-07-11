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

function range(from, to) {
  step = (to - from) / 3;
  return [from, from + step, from + step + step, to];
}

function isMember(element, set) {
  return set.indexOf(element) >= 0;
}

function isSubset(smallerSet, biggerSet) {
  return smallerSet.every(function(element) {
    return isMember(element, biggerSet);
  });
}

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

