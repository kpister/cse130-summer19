/* recall our definition:
const add42 = (el) => {
  return el + 42;
};
*/

function makeAddFunc(offset) {
  return (x) => {
    return offset + x; // note offset is captured here
  };
}

const add42 = makeAddFunc(42);
const sub42 = makeAddFunc(-42);

console.log(add42(1)); // ??
console.log(add42(42)); // ??

console.log(sub42(1)); // ??
console.log(sub42(42)); // ??
