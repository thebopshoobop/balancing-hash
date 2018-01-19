# Hash Table (and Linked List)

This is an implementation of a hash table using an array of linked-list buckets. Like JavaScript Objects, it can store arbitrary data as values but only supports string keys. You can test the modules using the Jasmine tests in the `spec` directory (Note: The tests utilize some Jasmine 2 syntax, so the embedded Jasmine in `jasmine-node` will not work).

## Linked List

This linked list accepts an arbitrary `data` payload, which can be any sort of JavaScript variable. It contains some extra features that are not used in the hash table, but are neat so I left them in (get, insert, append, reverse, etc.).

One important feature that is used extensively in the hash table is the `[Symbol.iterator]` method, which makes it [iterable](http://javascript.info/iterable). It provides some nice syntactic sugar for iterating over the list:

```js
for (let nodeData of linkedListInstance) {
  doWhatever(nodeData);
}
```

## Hash Table

The hash table constructor accepts an optional options object that may include an iterable of key-value pairs to hydrate the table as well as several hashing options. It also includes automatic redistribution functionality to limit the number of hash collisions. It starts out with 100 buckets and, when one of the buckets reaches the specified threshold, it doubles the number of buckets and rehashes all of the data. You can change the redistribution threshold by including it in the options object.

The other two options are a large prime number and a seed number. These two numbers are used to define the hashing function. The prime number defines a family of hash functions, and the seed number (which must be greater than zero and less than the size of the prime) selects one member of the family. Unfortunately, JavaScript's relatively small [maximum number size](https://stackoverflow.com/questions/307179/what-is-javascripts-highest-integer-value-that-a-number-can-go-to-without-losin), limit the size of these numbers. You can play around with these values, but your table will become decidedly unbalanced (you can check with the `displayLength` method) if the math produces numbers that are too large. It might be worthwhile to re-implement this with an arbitrary-size number library like [big](https://github.com/MikeMcl/big.js).

The hashing algorithm itself is pretty simple. It is entirely contained within the `_hash` method. If the code is unclear here are a couple other ways of describing it:

* In words: First you create a character sum by iterating (reducing) over the characters in the key. You add each new value to the sum of the preceeding values. For each character, you find its character code and multiply it by the seed value taken to the power of the current character's index in the string. Once you have summed all of those values, you take that sum [modulo](https://en.wikipedia.org/wiki/Modulo_operation) the large prime and then modulo the current number of buckets.
* In symbols:

  * S is the key to be hashed
  * b is the current number of buckets
  * p is the prime
  * x is the seed number
  * i is the index of the current character in the key
  * |S| is the length of the key
  * ∑ represents the [summation](https://en.wikipedia.org/wiki/Summation#Capital-sigma_notation) of all of the values of i from 0 to |S|.

  ![formula](https://i.imgur.com/Cq4B4sb.png)
