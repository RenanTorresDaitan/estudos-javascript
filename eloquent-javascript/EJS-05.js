console.log("\nA Vector Type\n");
/*Write a class Vec that represents a vector in two-dimensional space. 
It takes x and y parameters (numbers), which it should save to properties of the same name.

Give the Vec prototype two methods, plus and minus, 
that take another vector as a parameter and return 
a new vector that has the sum or difference of the 
two vectors’ (this and the parameter) x and y values.

Add a getter property length to the prototype that 
computes the length of the vector—that is, the 
distance of the point (x, y) from the origin (0, 0).*/

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(otherVector) {
    return new Vec(this.x + otherVector.x, this.y + otherVector.y);
  }
  minus(otherVector) {
    return new Vec(this.x - otherVector.x, this.y - otherVector.y);
  }
  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

console.log("\nGroups\n");

/*Write a class called Group (since Set is already taken). 
Like Set, it has add, delete, and has methods. 
Its constructor creates an empty group, add adds a value to the group 
(but only if it isn’t already a member), delete removes its argument 
from the group (if it was a member), and has returns a Boolean value 
indicating whether its argument is a member of the group.

Use the === operator, or something equivalent such as indexOf, 
to determine whether two values are the same.

Give the class a static from method that takes an iterable 
object as argument and creates a group that contains all the 
values produced by iterating over it.
*/

class Group {
  constructor() {
    this.values = [];
  }
  add(valueToAdd) {
    if (!this.has(valueToAdd)) {
      this.values.push(valueToAdd);
    }
  }
  delete(valueToDelete) {
    if (this.has(valueToDelete)) {
      this.values = this.values.splice(
        this.values.indexOf(valueToDelete - 1),
        1
      );
    }
  }
  has(value) {
    return this.values.includes(value);
  }
  static from(obj) {
    const newGroup = new Group();
    for (const item of obj) {
      newGroup.add(item);
    }
    return newGroup;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
