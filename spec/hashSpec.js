const Hash = require("../hash");
const dictionary = require("../dictionary.json");
const entries = Object.entries(dictionary);

describe("The Hash class", () => {
  let hash, logger;
  beforeEach(() => {
    hash = new Hash();
    logger = jasmine.createSpy("logger");
  });

  it("can add words and locate their definitions", () => {
    hash.insert("apple", "bar");
    hash.insert("frog", "an Ape");
    hash.insert("zooanimal", "some animal in a zoo dude");

    expect(hash.get("apple")).toEqual("bar");
    expect(hash.get("frog")).toEqual("an Ape");
    expect(hash.get("zooanimal")).toEqual("some animal in a zoo dude");
  });

  it("accepts an iterable as an optional argument and hydrates the hash", () => {
    hash = new Hash({ entries });

    expect(hash.get("certification")).toEqual("The act of certifying.");
    entries.forEach(([word, def]) => expect(hash.get(word)).toEqual(def));
  });

  it("displays itself all pretty like", () => {
    hash.insert("frog", "an Ape");
    hash.display(logger);

    expect(logger).toHaveBeenCalledWith("frog: an Ape\n");
  });

  it("displays the length of each bucket", () => {
    hash = new Hash({ entries });

    hash.displayLength(logger);

    const lengths = logger.calls.argsFor(0)[0].split("\n");
    lengths.forEach(length => expect(length).toMatch(/^\d+: \d+$/));
  });

  it("logs the number of linked list nodes traversed when defining", () => {
    hash.insert("apple", "bar");
    hash.insert("frog", "an Ape");
    hash.insert("fiesta", "a party");
    hash.insert("frankenstein", "a mad scientist");

    hash.get("frog", logger);
    hash.get("fiesta", logger);

    logger.calls.allArgs().forEach(callArg => {
      expect(callArg).toMatch(/^Steps: \d+$/);
    });
  });
});
