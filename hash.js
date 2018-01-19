const LinkedList = require("./linkedList");

class Hash {
  constructor({
    entries = [],
    prime = 4300000013,
    seed = 560,
    threshold = 50
  } = {}) {
    this.prime = prime;
    this.seed = seed;
    this.threshold = threshold;

    this.insertions = 0;
    this.numBuckets = 100;
    this.buckets = this._buildBuckets();

    for (let [key, value] of entries) {
      this.insert(key, value);
    }
  }

  _buildBuckets() {
    let buckets = [];
    for (let i = 0; i < this.numBuckets; i++) {
      buckets.push(new LinkedList());
    }
    return buckets;
  }

  _hash(key) {
    const charSum = key.split("").reduce((sum, char, i) => {
      return sum + char.charCodeAt(0) * this.seed ** i;
    }, 0);

    return (charSum % this.prime) % this.numBuckets;
  }

  _redistribute() {
    this.numBuckets *= 2;
    this.buckets = this.buckets.reduce((newBuckets, bucket) => {
      for (let { key, value } of bucket) {
        newBuckets[this._hash(key)].add({ key, value });
      }
      return newBuckets;
    }, this._buildBuckets());
  }

  insert(key, value, logger = () => null) {
    this.insertions++;
    const wordHash = this._hash(key);
    this.buckets[wordHash].add({ key, value });

    if (this.buckets[wordHash].length > this.threshold) {
      logger(`Redistributing: ${this.numBuckets * 2} buckets`);
      this._redistribute();
    }
  }

  get(query, logger = () => null) {
    let steps = 1;
    let response = null;

    for (let { key, value } of this.buckets[this._hash(query)]) {
      steps++;
      if (query == key) {
        response = value;
        break;
      }
    }

    logger(`Steps: ${steps}`);
    return response;
  }

  display(logger = console.log) {
    const displayString = this.buckets.reduce((displayString, bucket) => {
      for (let { key, value } of bucket) {
        displayString += `${key}: ${value}\n`;
      }
      return displayString;
    }, "");
    logger(displayString);
  }

  displayLength(logger = console.log) {
    const lengths = this.buckets.map((bucket, i) => `${i}: ${bucket.length}`);
    logger(lengths.join("\n"));
  }
}

module.exports = Hash;
