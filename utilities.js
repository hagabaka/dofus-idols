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

