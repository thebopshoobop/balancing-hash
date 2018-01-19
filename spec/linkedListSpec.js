const LinkedList = require("../linkedList");

describe("The LinkedList class", () => {
  let ll;
  beforeEach(() => {
    ll = new LinkedList();
    ll.add("potato");
    ll.add("kale");
    ll.add("zucchini");
  });

  it("can return the node at a given index", () => {
    expect(ll.get(1)).toEqual("kale");
  });

  it("can insert a node at a given index", () => {
    ll.insert("bell pepper", 1);

    expect(ll.get(1)).toEqual("bell pepper");
    expect(ll.get(2)).toEqual("kale");
  });

  it("can tell you how many nodes it contains", () => {
    expect(ll.length).toEqual(3);
  });

  it("can append a node to the end", () => {
    const index = ll.length;
    ll.append("carrot");

    expect(ll.get(index)).toEqual("carrot");
  });

  it("can be reversed", () => {
    ll.reverse();

    expect(ll.get(0)).toEqual("potato");
  });

  it("can remove a node from a given index", () => {
    ll.remove(1);

    expect(ll.get(1)).toEqual("potato");
  });

  it("is iterable", () => {
    const values = ["zucchini", "kale", "potato"];
    let current = 0;
    for (let node of ll) {
      expect(node).toEqual(values[current++]);
    }
  });
});
