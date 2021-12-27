const checkObjectsEqual = (obj1, obj2) => {
  // check for null
  if (obj1 === null || obj2 === null) return false;
  // check reference
  if (obj1 === obj2) return true;
  // compare object keys length
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  // for small objects stringify json and compare
  // return JSON.stringify(obj1) === JSON.stringify(obj2);
  // becomes slow for large objects because it has to parse the whole json

  // for large objects
  for (let key in obj1) {
    // check if obj2 has the same property
    if (!obj2.hasOwnProperty(key)) return false;
    // recurse if obj1[key] is an object
    if (typeof obj1[key] === "object")
      return checkObjectsEqual(obj1[key], obj2[key]);
    // compare values
    if (obj1[key] !== obj2[key]) return false;
  }

  // return true finally if all checks passed
  return true;
};

const obj1 = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: {
    eight: "8",
    nine: "9",
  },
};

const obj2 = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: {
    eight: "8",
    nine: "9",
  },
};

console.log(
  `check objects equal function already defined, obj1 and obj2 defined`
);
console.log(`Usage: checkObjectsEqual(object1, object2)`);
